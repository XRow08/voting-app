import Image from 'next/image';

export default function YourVotes({ userVotes }) {

   const formattedVotes = userVotes.toLocaleString();

    return (
        <div className="flex justify-around items-center w-72 mt-8 border border-[#FFC853] rounded-full p-2">
            <div className="flex items-center">
                <div className="relative mr-3">
                    <Image
                        src="/assets/stars-on/animation-bg.png"
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
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center">
            <span className="text-white font-semibold text-sm justify-center">YOUR VOTES</span>
            </div>
            <div className="border border-[#6B6B6B] rounded-full">
                <div className="bg-counter rounded-full flex items-center justify-center py-2 px-6">
                    <span className="text-black font-extrabold text-sm"> {formattedVotes} </span>
                </div>
            </div>
        </div>
    );
}