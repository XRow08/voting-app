import Image from 'next/image'
import Link from 'next/link'

export default function InfoSection() {
    return (
      <div className="flex flex-col items-center w-full max-w-md mt-8">
        {/* Botão GET STARS NOW */}
        <div className="flex w-full max-w-[280px] h-[60px] mb-4 items-center justify-center">
          <Image
            src="/assets/stars-on/stars-left.png"
            alt="Estrelas à esquerda"
            width={33}
            height={33}
            className="left-0 mt-[-15px]"
          />
          <Link href="#get-stars" className="modal-stars">
          <Image
            src="/assets/stars-on/getstars.png"
            alt="Get Stars Now"
            width={200}
            height={44}
          />
          </Link>
          <Image
            src="/assets/stars-on/stars-right.png"
            alt="Estrelas à direita"
            width={33}
            height={33}
            className="left-0 mt-[-15px]"
          />
        </div>
      </div>
    );
  }
