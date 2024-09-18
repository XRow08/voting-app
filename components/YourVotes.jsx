// create component for your votes
import Image from 'next/image';

export default function YourVotes({ userVotes }) {
    return (
        <div className="flex justify-between items-center w-full mb-8 mt-4">
        <div className="flex items-center">
          <div className="relative mr-2">
            <Image
              src="/assets/stars-off/animation-bg.png"
              alt="Your Votes Background"
              width={50}
              height={50}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/assets/stars-off/hands-animation.gif"
                alt="Hands Animation"
                width={30}
                height={30}
              />
            </div>
          </div>
          <span className="text-white font-bold text-sm">Your Votes</span>
        </div>
        <div className="bg-white rounded-full p-1">
          <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{userVotes}</span>
          </div>
        </div>
      </div>
    );
}