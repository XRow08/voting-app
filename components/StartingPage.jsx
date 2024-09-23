'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function StartingPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        <Image
          src="/assets/stars-off/animation-bg.png"
          alt="Animation Background"
          width={150}
          height={150}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assets/stars-off/hands-animation.gif"
            alt="Hands Animation"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="absolute bottom-10 text-white text-2xl">
        Redirecionando em {countdown}...
      </div>
    </div>
  );
}