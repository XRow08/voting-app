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
    } else {
      //setMessage(`You voted for ${voteType}`);
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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Who will be the next president?</h1>

      <button
        onClick={() => handleVote('vote_1')}
        disabled={loading}
        style={{ marginRight: '10px', padding: '10px 20px' }}
      >
        Kamalla ({vote1Count})
      </button>

      <button
        onClick={() => handleVote('vote_2')}
        disabled={loading}
        style={{ padding: '10px 20px' }}
      >
        Trump ({vote2Count})
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
