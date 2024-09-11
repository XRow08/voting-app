export default function InfoSection() {
    return (
      <div className="flex justify-between w-full max-w-md mt-6">
        {/* Ends in 10 days */}
        <div className="flex items-center border border-gray-500 rounded-full px-4 py-2">
          {/* Calendar Icon */}
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.09961 1.6001C5.43098 1.6001 5.69961 1.86873 5.69961 2.2001V3.2001H11.2996V2.2001C11.2996 1.86873 11.5682 1.6001 11.8996 1.6001C12.231 1.6001 12.4996 1.86873 12.4996 2.2001V3.2001H12.6996C13.9146 3.2001 14.8996 4.18507 14.8996 5.4001V12.2001C14.8996 13.4151 13.9146 14.4001 12.6996 14.4001H4.29961C3.08458 14.4001 2.09961 13.4151 2.09961 12.2001V5.4001C2.09961 4.18507 3.08458 3.2001 4.29961 3.2001H4.49961V2.2001C4.49961 1.86873 4.76824 1.6001 5.09961 1.6001ZM4.29961 6.0001C3.74732 6.0001 3.29961 6.44781 3.29961 7.0001V12.2001C3.29961 12.7524 3.74732 13.2001 4.29961 13.2001H12.6996C13.2519 13.2001 13.6996 12.7524 13.6996 12.2001V7.0001C13.6996 6.44781 13.2519 6.0001 12.6996 6.0001H4.29961Z" fill="#FF6F00"/>
          </svg>
          <span className="text-white ml-1">Ends in 10 days</span>
        </div>
  
        {/* Attendees */}
        <div className="flex items-center border border-gray-500 rounded-full px-4 py-2">
          {/* User Icon */}
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.49902 8C10.1559 8 11.499 6.65685 11.499 5C11.499 3.34315 10.1559 2 8.49902 2C6.84217 2 5.49902 3.34315 5.49902 5C5.49902 6.65685 6.84217 8 8.49902 8Z" fill="#FF6F00"/>
          <path d="M13.2337 14C13.8521 14 14.3265 13.439 14.106 12.8613C13.2445 10.6036 11.0587 9 8.49844 9C5.93815 9 3.7524 10.6036 2.89084 12.8613C2.67036 13.439 3.14477 14 3.76315 14H13.2337Z" fill="#FF6F00"/>
          </svg>
          <span className="text-white ml-1">5,430 Attendees</span>
        </div>
      </div>
    );
  }
  