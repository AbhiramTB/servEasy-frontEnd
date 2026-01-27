import React from 'react';
import { IServiceDateTime, ITimeSlot } from '../../../utils/types/booking';
import dayjs from 'dayjs';

interface ServiceDateTimeProps {
  serviceDateTime: IServiceDateTime;
  userType: "user" | "serviceProvider";
  isCancelled?: boolean;
}

const ServiceDateTime: React.FC<ServiceDateTimeProps> = ({
  serviceDateTime,
  userType,
  isCancelled = false
}) => {
  const formatDate = (date: Date): string => {
    
    return `${dayjs(date).format("DD MMM YYYY")}    `;
  };

  const formatTimeSlot = (timeSlot: ITimeSlot): string => {
    switch (timeSlot) {
      case 'morning':
        return '🌅 Morning (9:00 AM - 12:00 PM)';
      case 'afternoon':
        return '🌇 Afternoon (1:00 PM - 5:00 PM)';
      case 'anyTime':
        return '⏰ Any Time';
      default:
        return '⏰ Any Time';
    }
  };

  const getDisplayText = ():{date:string,time:string} => {
    const formattedDate = formatDate(serviceDateTime.date);
    const formattedTime = formatTimeSlot(serviceDateTime.time);
    
    if (userType === 'user') {
      return {date:`Your preferred time: ${formattedDate}`,
    time:`${formattedTime}`};
    } else {

     return { date:`user preferred time: ${formattedDate}`,
    time:`${formattedTime}`}
    }
  };

  return (
    <div className="flex items-center p-3 text-sm border rounded-lg bg-base-100 border-base-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 w-4 h-4 mr-2 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-base-content">
        {isCancelled ? (
          <span className="line-through opacity-60">
            {getDisplayText().date}
            <br />
            { getDisplayText().time}
          </span>
        ) : (
          <>
         { getDisplayText().date}
           <br />
           { getDisplayText().time}
            </>
        )}
      </span>
    </div>
  );
};

export default ServiceDateTime;
