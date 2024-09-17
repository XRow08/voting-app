import Link from "next/link"
import Image from "next/image";
import StarSwitch from "./Starswitch";

const Header = () => {
  const imageProps = {
    width: 44,
    height: 44,
    quality: 100,
    priority: true
  };

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center w-1/2">
        <span className="text-white p-4 py-1 flex items-left">
          <StarSwitch />
        </span>
      </div>          
      <div className="flex space-x-2 pr-4 pt-3 items-center">
        <Link href="/">
          <Image
            src="/assets/stars-off/question-icon.png"
            alt="Question Icon"
            {...imageProps}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/stars-off/x-icon.png"
            alt="Close"
            {...imageProps}
          />
        </Link>
      </div>
    </header>
  )
};

export default Header;