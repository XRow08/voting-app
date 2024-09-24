export default function Footer({ vote1Count, vote2Count }) {
  return (
    <div className="flex justify-around items-center w-full max-w-lg mt-2">
      <div>
        <p className="text-secondary font-bold uppercase h-6">Total Votes</p>
        <p className="text-white font-bold text-left">{vote1Count.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-secondary font-bold uppercase h-6">Total Votes</p>
        <p className="text-white font-bold text-right">{vote2Count.toLocaleString()}</p>
      </div>
    </div>
  );
}
