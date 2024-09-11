// components/Footer.tsx
interface FooterProps {
    vote1Count: number;
    vote2Count: number;
  }
  
  export default function Footer({ vote1Count, vote2Count }: FooterProps) {
    return (
      <div className="flex justify-between items-center w-full max-w-md mt-6">
        <div className="text-white">
          <p>Total Votes</p>
          <p className="font-bold">{vote1Count.toLocaleString()}</p>
        </div>
        <div className="text-white text-right">
          <p>Total Votes</p>
          <p className="font-bold">{vote2Count.toLocaleString()}</p>
        </div>
      </div>
    );
  }
  