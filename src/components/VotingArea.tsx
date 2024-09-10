// components/VotingArea.tsx
import Image from 'next/image';

interface VotingAreaProps {
  handleVote: (voteType: string) => void;
}

export default function VotingArea({ handleVote }: VotingAreaProps) {
  return (
    <div className="flex justify-center items-center mt-16">
      {/* Trump Section */}
      <div className="flex flex-col items-center">
        <Image
          onClick={() => handleVote('vote_1')}
          src="/images/trump.png"
          alt="Vote for Trump"
          width={145}
          height={162}
          className="active:scale-95 active:shadow-inner transition-transform cursor-pointer"
        />
      </div>

      {/* VS Text */}
      <div className="mx-8 text-white text-2xl">
        <Image
          src="/images/vs-icon.png"
          alt="VS"
          width={22}
          height={24}
        />
      </div>

      {/* Kamala Section */}
      <div className="flex flex-col items-center">
        <Image
          onClick={() => handleVote('vote_2')}
          src="/images/kamalla.png"
          alt="Vote for Kamala"
          width={145}
          height={162}
          className="active:scale-95 active:shadow-inner transition-transform cursor-pointer"
        />
      </div>
    </div>
  );
}
