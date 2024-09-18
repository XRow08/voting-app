import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import animationData from 'public/assets/animations/vote-animation.json';

export default function VotingArea({ handleVote }) {
  const [flipCount, setFlipCount] = useState({ vote_1: 0, vote_2: 0 });
  const [isAnimating, setIsAnimating] = useState({ vote_1: false, vote_2: false });
  const [isFlashing, setIsFlashing] = useState(false);
  const lottieRefTrump = useRef(null);
  const lottieRefKamala = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/assets/animations/vote_sound.wav');
    audioRef.current.playbackRate = 2; // Set playback rate to 3x
  }, []);

  const handleVoteClick = (voteType) => {
    if (!isAnimating[voteType]) {
      setFlipCount(prev => ({ ...prev, [voteType]: prev[voteType] + 1 }));
      handleVote(voteType);
      setIsAnimating(prev => ({ ...prev, [voteType]: true }));
      setIsFlashing(true);

      // Play the coin sound at 3x speed
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset audio to start
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      }

      // Vibrate for mobile devices that support it
      if (navigator.vibrate) {
        navigator.vibrate(2000);
      }

      const lottieRef = voteType === 'vote_1' ? lottieRefTrump : lottieRefKamala;
      if (lottieRef.current) {
        lottieRef.current.setSpeed(4.0);
        lottieRef.current.goToAndPlay(0);
      }

      setTimeout(() => {
        setIsAnimating(prev => ({ ...prev, [voteType]: false }));
        setIsFlashing(false);
      }, 300); // Duração da animação de flip
    }
  };

  return (
    <div className={`flex justify-center items-center mt-10 ${isFlashing ? 'flash' : ''}`}>
      {/* Trump Section */}
      <div className="relative flex flex-col items-center">
        <Lottie
          lottieRef={lottieRefTrump}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            top: '-100px',
            zIndex: -1,
            opacity: isAnimating.vote_1 ? 0.5 : 0, // Alterado para 0.5 (50% de opacidade)
          }}
        />
        <div className={`flip-container ${isAnimating.vote_1 ? 'shake-hard' : ''}`} style={{ transform: `rotateY(${flipCount.vote_1 * 360}deg)` }}>
          <div className="flipper">
            <Image
              onClick={() => handleVoteClick('vote_1')}
              src="/assets/stars-off/trump.png"
              alt="Vote for Trump"
              width={145}
              height={163}
              quality={100}
              
              className="front active:scale-95 active:shadow-inner transition-transform cursor-pointer"
            />
          </div>
        </div>
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
      <div className="relative flex flex-col items-center">
        <Lottie
          lottieRef={lottieRefKamala}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            top: '-100px',
            zIndex: -1,
            opacity: isAnimating.vote_2 ? 0.5 : 0, // Alterado para 0.5 (50% de opacidade)
          }}
        />
        <div className={`flip-container ${isAnimating.vote_2 ? 'shake-hard' : ''}`} style={{ transform: `rotateY(${flipCount.vote_2 * 360}deg)` }}>
          <div className="flipper">
            <Image
              onClick={() => handleVoteClick('vote_2')}
              src="/assets/stars-off/kamalla.png"
              alt="Vote for Kamala"
              width={145}
              height={163}
              quality={100}
              className="front active:scale-95 active:shadow-inner transition-transform cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
