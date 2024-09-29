'use client'
import Link from "next/link"
import Image from "next/image";
import { usePathname } from "next/navigation";
import StarSwitchOff from "/components/starsOff/StarSwitch";
import StarSwitchOn from "/components/StarsOn/StarSwitch";

const Header = () => {
  const pathname = usePathname();
  const isStarsOnPage = pathname === '/stars-on';

  const imageProps = {
    width: 44,
    height: 44,
    quality: 100,
    priority: true
  };

  const folderName = isStarsOnPage ? 'stars-on' : 'stars-off';

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center w-1/2">
        <span className="text-white p-4 py-1 flex items-left">
          <Link href={isStarsOnPage ? '/' : '/stars-on'}>
            {isStarsOnPage ? <StarSwitchOn /> : <StarSwitchOff />}
          </Link>
        </span>
      </div>          
      <div className="flex space-x-2 pr-4 pt-3 items-center">
        <Link href="/">
          <Image
            src={`/assets/${folderName}/question-icon.png`}
            alt="Question Icon"
            {...imageProps}
          />
        </Link>
        <Link href="https://x.com/duelstakes?s=duelstakes" target="_blank">
          <Image
            src={`/assets/${folderName}/x-icon.png`}
            alt="Close"
            {...imageProps}
          />
        </Link>
      </div>
    </header>
  )
};

export default Header;