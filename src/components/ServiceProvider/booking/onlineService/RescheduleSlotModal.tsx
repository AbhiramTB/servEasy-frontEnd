import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';

interface RescheduleSlotProps {
  onSubmit: (payload: { date: Date; startTime: Date; endTime: Date }) => void;
  onClose: () => void;
}

const RescheduleSlotModal: React.FC<RescheduleSlotProps> = ({ onSubmit, onClose }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const today = dayjs().startOf('day');
  const maxDate = today.add(7, 'day');

  const minDateStr = today.format('YYYY-MM-DD');
  const maxDateStr = maxDate.format('YYYY-MM-DD');

  const validate = () => {
    if (!date || !startTime || !endTime) {
      return 'All fields are required';
    }

    const selectedDate = dayjs(date);

    if (selectedDate.isBefore(today)) {
      return 'Date must be in the future';
    }

    if (selectedDate.isAfter(maxDate)) {
      return 'You can reschedule only within the next 7 days';
    }

    const start = selectedDate.hour(Number(startTime.split(':')[0])).minute(Number(startTime.split(':')[1]));

    const end = selectedDate.hour(Number(endTime.split(':')[0])).minute(Number(endTime.split(':')[1]));

    if (end.isSameOrBefore(start)) {
      return 'End time must be after start time';
    }

    if (selectedDate.isSame(today, 'day')) {
      if (start.isBefore(dayjs())) {
        return 'Start time must be in the future';
      }
    }

    return null;
  };

  const handleSubmit = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const selectedDate = dayjs(date);

    const start = selectedDate
      .hour(Number(startTime.split(':')[0]))
      .minute(Number(startTime.split(':')[1]))
      .second(0)
      .toDate();

    const end = selectedDate
      .hour(Number(endTime.split(':')[0]))
      .minute(Number(endTime.split(':')[1]))
      .second(0)
      .toDate();

    onSubmit({
      date: selectedDate.toDate(),
      startTime: start,
      endTime: end,
    });
  };

  const isDisabled = useMemo(() => {
    return !!validate();
  }, [date, startTime, endTime]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-6 bg-base-100 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold text-primary mb-4">Reschedule Slot</h2>

        <div className="mb-4">
          <label className="label">Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            min={minDateStr}
            max={maxDateStr}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="label">Start Time</label>
          <input
            type="time"
            className="input input-bordered w-full"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="label">End Time</label>
          <input
            type="time"
            className="input input-bordered w-full"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>

        {error && <div className="mb-4 text-sm text-error flex items-center gap-2">⚠️ {error}</div>}

        <div className="flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={isDisabled}>
            Update Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleSlotModal;
