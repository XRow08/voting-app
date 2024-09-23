'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function StartingPage({ onFinish }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={200}
        height={200}
      />
      <div className="text-white text-2xl mt-4">
        Redirecionando em {countdown}...
      </div>
    </div>
  );
}