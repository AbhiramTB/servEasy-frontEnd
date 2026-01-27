import React from "react";
import dayjs from "dayjs";
import { IBookingHistory } from "../../utils/types/booking";

interface BookingHistoryListProps {
  history: IBookingHistory[];
}

const BookingHistoryList: React.FC<BookingHistoryListProps> = ({ history }) => {
  if (!history.length) {
    return <p className="text-xs text-gray-400">No booking history.</p>;
  }

  return (
    <ul className="space-y-1 text-xs text-gray-600">
      {history.map((entry) => (
        <li key={entry._id} className="flex flex-col leading-tight">
          <span className="font-medium text-primary">{entry.action}</span>
          <span>{entry.message}</span>
          <span className="text-gray-400 text-[10px]">
            {dayjs(entry.timestamp).format("MMM D, YYYY h:mm A")}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default BookingHistoryList;
