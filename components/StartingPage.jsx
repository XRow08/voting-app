'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function StartingPage({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 50000;
    const interval = 50;
    const steps = duration / interval;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 100 / steps;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, interval);

    const redirect = setTimeout(() => {
      onFinish();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden">
      <div className="w-[327px] h-[480px] flex flex-col items-center justify-center relative py-16 rounded-[16px]"
           style={{
             border: '0.7px solid transparent',
             borderColor: '#FF6F00',
             background: 'rgba(0, 0, 0, 0.2)'
           }}>
        <Image
          src="/assets/starting-page/dualstakeslogowhite.png"
          alt="Dualstakes Logo"
          width={181}
          height={32}
          className="mb-8"
        />
        <div className="relative">
          <svg className="w-[200px] h-[200px] transform -rotate-90">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="transparent"
              stroke="#2C2C2C"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="transparent"
              stroke="#FF6F00"
              strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <Image
            src="/assets/starting-page/center-logo.png"
            alt="Center Logo"
            width={61}
            height={72}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className={`text-white text-xl mt-8 transition-opacity duration-1000 ${progress % 4 < 2 ? 'opacity-100 animate-fade-in' : 'opacity-0 animate-fade-out'}`}>
          Loading
        </div>
        <div className="text-[#6B6B6B] text-sm mt-2">
            Please wait while we redirect you.
        </div>
      </div>
      <Image
        src="/assets/starting-page/sidebar.png"
        alt="Sidebar"
        width={150}
        height={27}
        className="absolute bottom-0 left-0 max-h-[27px] w-auto"
      />
    </div>
  );
}