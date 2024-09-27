export default function VotingProgressBar({ vote1Percentage, vote2Percentage }) {
  const totalBlocks = 30; // Número total de blocos para representar 100%
  const vote1Blocks = Math.round((vote1Percentage / 100) * totalBlocks); // Blocos para Trump
  const vote2Blocks = Math.round((vote2Percentage / 100) * totalBlocks); // Blocos para Kamala

  return (
    <div className="flex justify-center w-full max-w-sm mt-2">
      {/* Trump Blocks */}
      <div className="flex">
        {Array.from({ length: vote1Blocks }).map((_, index) => (
          <div
            key={index}
            className={`bg-redtrump h-6 w-2 ${
              index === 0 ? 'rounded-left' : ''
            } ${index === vote1Blocks - 1 ? 'rounded-right' : ''} mr-0.5`}
          />
        ))}
      </div>

      {/* Kamala Blocks */}
      <div className="flex">
        {Array.from({ length: vote2Blocks }).map((_, index) => (
          <div
            key={index}
            className={`bg-bluekamala h-6 w-2 ${
              index === 0 ? 'rounded-left' : ''
            } ${index === vote2Blocks - 1 ? 'rounded-right' : ''} mr-0.5`}
          />
        ))}
      </div>
    </div>
  );
}
