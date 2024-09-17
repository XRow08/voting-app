
'use client'; // if using /app router
import { useEffect, useState } from 'react';
import { supabase } from 'lib/supabaseClient';
import Image from "next/image";
import Link from 'next/link';


import VotingArea from '../components/VotingArea';
import VotingProgressBar from '../components/ProgressBar';
import InfoSection from '@components/Infosection';
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
  const handleVote = async (voteType) => {
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
    <div className="min-h-screen flex flex-col items-center p-3 max-w-sm mx-auto">
      {/* Header */}

      {/* Main Section */}
      <div className="text-center mt-12">
        <h1 className="font-space-grotesk text-[24px] text-white font-light leading-[24px] text-center">TAP TO VOTE</h1>
        <h2 className="font-space-grotesk text-[35.16px] font-bold text-white leading-[35.16px] text-center mt-2">WHO WILL BE THE NEXT PRESIDENT?</h2>
      </div>

      {/* Voting Area */}
      <VotingArea handleVote={handleVote} />

      {/* Progress Bars */}
        <div className="flex justify-center gap-16 w-full max-w-md mt-8">
          {/* Trump Progress */}
          <div className="flex flex-col items-center">
            <span className="font-inter text-[16px] font-normal leading-[16px] text-center text-white">
              TRUMP 
              <span className="text-redtrump"> {vote1Percentage.toFixed(0)}%</span>
            </span>
          </div>
          {/* Kamala Progress */}
          <div className="flex flex-col items-center">
            <span className="font-inter text-[16px] font-normal leading-[16px] text-center text-white">
              KAMALA 
              <span className="text-bluekamala"> {vote2Percentage.toFixed(0)}%</span>
            </span>
          </div>
        </div>
        <VotingProgressBar vote1Percentage={vote1Percentage.toFixed(0)} vote2Percentage={vote2Percentage.toFixed(0)} />
      

      {/* FooterVotes */}
      <Footer vote1Count={vote1Count} vote2Count={vote2Count} />


      {/* Info Section */}
      <InfoSection />


      {/* Bet with Stars Button */}
      <div className="flex justify-center items-center w-full max-w-md mt-10">
      <Link href="/">
          <Image
            src="/assets/stars-off/bet-with-stars.png"
            alt="Bet With Stars"
            width={234}
            height={150}
            quality={100}
            priority
          />
          </Link>
        </div>
    </div>
  );
}

