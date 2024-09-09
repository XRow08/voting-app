// app/page.tsx or pages/index.tsx
'use client'; // if using /app router
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

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
    <div
      className="background-section min-h-screen flex flex-col items-center bg-cover bg-center p-6"
    >
      {/* Header Section */}
      <header className="flex justify-between w-full max-w-md">
        <Image
        src="/images/stars-off.png"
        alt="Bet With Stars"
        width={156} 
        height={36}
        className=""
      />
      <Image
        src="/images/question-icon.png"
        alt="Twitter"
        width={44} 
        height={44}
        className="h-11"
      />
        <Image
        src="/images/x-icon.png"
        alt="Twitter"
        width={44} 
        height={44}
        className="h-11"
      />
      </header>

      {/* Main Section */}
      <div className="text-center mt-12">
        <h1 className="font-space-grotesk text-[24px] text-white font-light leading-[24px] text-center">TAP TO VOTE</h1>
        <h2 className="font-space-grotesk text-[35.16px] font-bold text-white leading-[35.16px] text-center mt-2">WHO WILL BE THE NEXT PRESIDENT?</h2>
      </div>

      {/* Voting Area */}
      <div className="flex justify-center items-center mt-16">
        {/* Trump Section */}
        <div className="flex flex-col items-center">
            <Image
            onClick={() => handleVote('vote_1')}
            src="/images/trump.png"
            alt="Vote"
            width={145} 
            height={162}
            className="active:scale-95 active:shadow-inner transition-transform cursor-pointer"
          />
        </div>

        {/* VS Text */}
        <div className="mx-8 text-white text-2xl">
        <Image
            src="/images/vs-icon.png"
            alt="Vote"
            width={22} 
            height={24}
            className=""
          />
        </div>

        {/* Kamala Section */}
        <div className="flex flex-col items-center">
        <Image
            onClick={() => handleVote('vote_2')}
            src="/images/kamalla.png"
            alt="Vote"
            width={145} 
            height={162}
           className="active:scale-95 active:shadow-inner transition-transform cursor-pointer"
          />
        </div>
      </div>

      {/* Progress Bars */}
      <div className="flex justify-between w-full max-w-md mt-10">
        {/* Trump Progress */}
        <div className="flex flex-col items-center">
          <span className="font-inter text-[16px] font-normal leading-[16px] text-center text-white">TRUMP 
            <span className="orange-main"> {vote1Percentage.toFixed(0)}%</span>
          </span>
          <div className="bg-gray-700 w-40 h-4 rounded-full overflow-hidden mt-2">
            <div
              className="bg-orange-500 h-4"
              style={{ width: `${vote1Percentage}%` }}
            />
          </div>
        </div>

        {/* Kamala Progress */}
        <div className="flex flex-col items-center">
          <span className="font-inter text-[16px] font-normal leading-[16px] text-center text-white">KAMALA 
            <span className="purple-main"> {vote2Percentage.toFixed(0)}%</span>
          </span>
          <div className="bg-gray-700 w-40 h-4 rounded-full overflow-hidden mt-2">
            <div
              className="bg-purple-500 h-4"
              style={{ width: `${vote2Percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center w-full max-w-md mt-6">
        <div className="text-white">
          <p>Total Votes</p>
          <p className="font-bold">{totalVotes.toLocaleString()}</p>
        </div>
        <div className="text-white text-right">
        <p>Total Votes</p>
          <p className="font-bold">{totalVotes.toLocaleString()}</p>
        </div>
      </div>

      {/* Bet with Stars Button */}
      <button className="mt-10 px-8 py-4 bg-orange-600 text-white font-bold rounded-full">
        BET WITH STARS
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
