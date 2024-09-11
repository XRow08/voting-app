// components/VotingArea.tsx
import Image from 'next/image';

export default function VotingArea({ handleVote }) {
  return (
    <div className="flex justify-center items-center mt-16">
      {/* Trump Section */}
      <div className="flex flex-col items-center">
        <Image
          onClick={() => handleVote('vote_1')}
          src="/assets/stars-off/trump.png"
          alt="Vote for Trump"
          width={145}
          height={162}
          quality={100}
          priority
          className="active:scale-95 active:shadow-inner transition-transform cursor-pointer"
        />
      </div>

      {/* VS Text */}
      <div className="mx-1 text-white text-2xl">
        <Image
          src="/assets/stars-off/vs-icon.png"
          alt="VS"
          width={40}
          height={24}
          quality={100}
          priority
        />
      </div>

      {/* Kamala Section */}
      <div className="flex flex-col items-center">
        <Image
          onClick={() => handleVote('vote_2')}
          src="/assets/stars-off/kamalla.png"
          alt="Vote for Kamala"
          width={145}
          height={162}
          className="active:scale-95 active:shadow-inner transition-transform cursor-pointer"
        />
      </div>
    </div>
  );
}
