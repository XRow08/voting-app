// components/Header.tsx
import Image from 'next/image';
import StarSwitch from "../components/StarSwitch";

export default function Header() {
  return (
    <header className="flex justify-between w-full max-w-md">
      
        <StarSwitch />
      
      <Image
        src="/images/question-icon.png"
        alt="Question Icon"
        width={44}
        height={44}
        className="h-11"
        priority
      />
      <Image
        src="/images/x-icon.png"
        alt="Close"
        width={44}
        height={44}
        className="h-11"
        priority
      />
    </header>
  );
}