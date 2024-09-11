// app/page.tsx or pages/index.tsx
'use client'; // if using /app router
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import VotingArea from '../components/VotingArea';
import ProgressBar from '../components/ProgressBar';
import Footer from '../components/Footer';

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
    <div className="background-section min-h-screen flex flex-col items-center bg-cover bg-center p-6">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <div className="text-center mt-12">
        <h1 className="font-space-grotesk text-[24px] text-white font-light leading-[24px] text-center">TAP TO VOTE</h1>
        <h2 className="font-space-grotesk text-[35.16px] font-bold text-white leading-[35.16px] text-center mt-2">WHO WILL BE THE NEXT PRESIDENT?</h2>
      </div>

      {/* Voting Area */}
      <VotingArea handleVote={handleVote} />

      {/* Progress Bars */}
      <div className="flex justify-between w-full max-w-md mt-10">
        <ProgressBar name="TRUMP" percentage={vote1Percentage} color="bg-orange-500" />
        <ProgressBar name="KAMALA" percentage={vote2Percentage} color="bg-purple-500" />
      </div>

      {/* Footer */}
      <Footer vote1Count={vote1Count} vote2Count={vote2Count} />

      {/* Bet with Stars Button */}
      <button className="mt-10 px-8 py-4 bg-orange-600 text-white font-bold rounded-full">
        BET WITH STARS
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
