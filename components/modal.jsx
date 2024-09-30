'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'] });

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-2xl max-w-md w-full h-full relative overflow-hidden border-2 border-[rgba(255,111,0,1)]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-4xl"
        >
          ×
        </button>
        <div className="px-4 h-full overflow-y-auto">
          <div className="mt-16 flex justify-center mb-4">
            <Image
              src="/assets/default/logo-dualstakes-modal.png"
              alt="Duel Stakes Logo"
              width={181}
              height={32}
            />
          </div>
          <h2 className={`${spaceGrotesk.className} text-white text-2xl font-bold mt-8 mb-1`}>FAQs</h2>
          <p className="text-gray-400 text-sm mb-4">Find answers to common questions here.</p>
          <div className="space-y-4 pb-6">
            <FaqItem
              question="What is Duel Stakes?"
              answer="Duel Stakes is the new style of betting, where the best players win. A full PVP experience rewarding the top players. The more you bet, the more you win. Instead of getting BANNED from those betting platforms, here you get MORE rewards."
            />
            <FaqItem
              question="How can I place a bet?"
              answer="To place a bet, simply tap on your preferred candidate, and your vote will be cast. You can vote for free or use stars to increase the impact of your vote. The more stars you use, the more influence your vote has."
            />
            <FaqItem
              question="How do I get stars?"
              answer="You can earn stars by participating in various activities within the app or by purchasing them directly through Telegram using the in-app purchase feature."
            />
            <FaqItem
              question="Can I change my vote after placing it?"
              answer="Yes, you can change your vote as many times as you like and vote for whoever you want."
            />
            <FaqItem
              question="What do I win if my candidate is successful?"
              answer="If you placed your bet using stars, you will earn a percentage based on your bet and the total pool. Stay tuned for updates as we roll out new features soon!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className={`${spaceGrotesk.className} flex justify-between items-center w-full py-2 text-left text-white font-bold`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <p className="text-gray-400 text-sm mt-1 pb-2">{answer}</p>
      )}
    </div>
  );
};

export default Modal;