// components/ProgressBar.tsx
interface ProgressBarProps {
    name: string;
    percentage: number;
    color: string;
  }
  
  export default function ProgressBar({ name, percentage, color }: ProgressBarProps) {
    return (
      <div className="flex flex-col items-center">
        <span className="font-inter text-[16px] font-normal leading-[16px] text-center text-white">
          {name}
          <span className={`${color}`}> {percentage.toFixed(0)}%</span>
        </span>
        <div className="bg-gray-700 w-40 h-4 rounded-full overflow-hidden mt-2">
          <div className={`h-4 ${color}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
  }
  