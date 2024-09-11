import Link from "next/link"
import Image from "next/image";
import StarSwitch from "./Starswitch";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
          <div className="flex items-center w-1/2">
            <span className="bg-orange-500 text-white p-4 py-1 flex items-left">
              <StarSwitch />
            </span>
          </div>          
          <div className="flex space-x-2 pr-4 pt-3 items-center">
          <Link href="/">
          <Image
            src="/assets/stars-off/question-icon.png"
            alt="Question Icon"
            width={44}
            height={44}
            quality={100}
            priority
          />
          </Link>
          <Link href="/">
            <Image
              src="/assets/stars-off/x-icon.png"
              alt="Close"
              width={44}
              height={44}
              quality={100}
              priority
            />
          </Link>
        </div>
    </header>
  )
};

export default Header;