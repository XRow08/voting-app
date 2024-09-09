// app/page.tsx or pages/index.tsx
'use client'; // if using /app router
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Home() {
  const [vote1Count, setVote1Count] = useState(0);
  const [vote2Count, setVote2Count] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to fetch the current vote counts
  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from('votes')
      .select('vote_type');

    if (!error && data) {
      // Count votes manually in JavaScript
      const vote1 = data.filter((vote) => vote.vote_type === 'vote_1').length;
      const vote2 = data.filter((vote) => vote.vote_type === 'vote_2').length;

      setVote1Count(vote1);
      setVote2Count(vote2);
    } else {
      console.error(error);
    }
  };

  // Function to handle voting
  const handleVote = async (voteType: string) => {
    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('votes').insert({ vote_type: voteType });

    if (error) {
      setMessage('Error saving vote');
    }

    setLoading(false);
  };

  // Real-time subscription for new votes
  useEffect(() => {
    fetchVotes(); // Fetch initial vote counts

    const voteSubscription = supabase
      .channel('public:votes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, (payload) => {
        const newVoteType = payload.new.vote_type;
        if (newVoteType === 'vote_1') {
          setVote1Count((prev) => prev + 1);
        } else if (newVoteType === 'vote_2') {
          setVote2Count((prev) => prev + 1);
        }
      })
      .subscribe();

    // Cleanup the subscription when component unmounts
    return () => {
      supabase.removeChannel(voteSubscription);
    };
  }, []);

  // Calculate the total number of votes
  const totalVotes = vote1Count + vote2Count;

  // Calculate the percentage for each candidate
  const vote1Percentage = totalVotes > 0 ? (vote1Count / totalVotes) * 100 : 0;
  const vote2Percentage = totalVotes > 0 ? (vote2Count / totalVotes) * 100 : 0;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className="mb-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Who will be the next president?</h1>


      <button
  onClick={() => handleVote('vote_1')}
  disabled={loading}
  className="mr-2 px-6 py-3 h-60 rounded-full w-60 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
>
  Kamalla ({vote1Count}) - {vote1Percentage.toFixed(2)}%
</button>

<button
  onClick={() => handleVote('vote_2')}
  disabled={loading}
  className="px-6 py-3 h-60 rounded-full w-60 bg-red-500 text-white font-semibold hover:bg-red-600 transition"
>
  Trump ({vote2Count}) - {vote2Percentage.toFixed(2)}%
</button>

      {message && <p>{message}</p>}
    </div>
  );
}
