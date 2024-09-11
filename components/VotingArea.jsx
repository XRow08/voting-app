import { useState, useRef } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import animationData from 'public/assets/animations/vote-animation.json';

export default function VotingArea({ handleVote }) {
  const [clickedCandidate, setClickedCandidate] = useState(null); // Armazena quem foi votado
  const lottieRef = useRef(null); // Referência para o player Lottie

  const handleVoteClick = (voteType) => {
    setClickedCandidate(voteType);
    handleVote(voteType);

    // Reiniciar a animação ao clicar novamente
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0); // Reinicia a animação desde o início
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      {/* Trump Section */}
      <div className="relative flex flex-col items-center">
        {/* Exibe a animação somente se o candidato clicado for 'vote_1' */}
        {clickedCandidate === 'vote_1' && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false} // A animação roda uma vez
            style={{
              width: 200,
              height: 200,
              position: 'absolute',
              top: '-100px', // Move a animação para cima
              zIndex: -1, // A animação fica atrás da imagem
            }}
          />
        )}
        <Image
          onClick={() => handleVoteClick('vote_1')}
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
      <div className="relative flex flex-col items-center">
        {/* Exibe a animação somente se o candidato clicado for 'vote_2' */}
        {clickedCandidate === 'vote_2' && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false} // A animação roda uma vez
            style={{
              width: 200,
              height: 200,
              position: 'absolute',
              top: '-100px', // Move a animação para cima
              zIndex: -1, // A animação fica atrás da imagem
            }}
          />
        )}
        <Image
          onClick={() => handleVoteClick('vote_2')}
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
