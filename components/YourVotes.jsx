import Image from 'next/image';

export default function YourVotes({ userVotes }) {
    return (
        <div className="flex justify-between items-center w-full mb-8 mt-4 bg-[#1E1E1E] rounded-full p-2">
            <div className="flex items-center">
                <div className="relative mr-3">
                    <Image
                        src="/assets/stars-off/animation-bg.png"
                        alt="Your Votes Background"
                        width={40}
                        height={40}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src="/assets/stars-off/hands-animation.gif"
                            alt="Hands Animation"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
                <span className="text-white font-semibold text-sm">Your Votes</span>
            </div>
            <div className="bg-[#2C2C2C] rounded-full p-1">
                <div className="bg-[#1E1E1E] rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{userVotes}</span>
                </div>
            </div>
        </div>
    );
}