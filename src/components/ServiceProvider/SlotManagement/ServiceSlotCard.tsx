import React, { useState } from 'react';
import { X, Clock, Plus, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ISlot } from '../../../utils/types/ISlot';

const IST_TIMEZONE = 'Asia/Kolkata';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

/* -------------------- Types -------------------- */

interface IService {
  _id: string;
  serviceImage: string;
  serviceName: string;
  estimatedPrice?: number;
  slots: ISlot[];
}

interface ServiceSlotCardProps {
  service: IService;
  onCreateSlot: (startTime: Date, endTime: Date) => void;
  onDeleteSlot: (slotId: string) => void;
}

/* -------------------- Utils -------------------- */

/** UI only */
const formatTime = (date: Date | string) => dayjs(date).tz(IST_TIMEZONE).format('hh:mm A');

/**
 * "09:00 AM" → Today IST → UTC Date
 */
const timeStringToDate = (time: string): Date => {
  const todayIST = dayjs().tz(IST_TIMEZONE).format('YYYY-MM-DD');

  const result = dayjs.tz(`${todayIST} ${time}`, 'YYYY-MM-DD hh:mm A', IST_TIMEZONE).utc().toDate();

  console.log('[TIME CONVERT]', {
    input: time,
    istDate: `${todayIST} ${time}`,
    utcDate: result,
  });

  return result;
};

/* -------------------- Time Picker -------------------- */

const TimePickerDropdown: React.FC<{
  value: string;
  onChange: (time: string) => void;
  placeholder: string;
  minTime?: string;
}> = ({ value, onChange, placeholder, minTime }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateTimeOptions = () => {
    const options: string[] = [];
    let current = dayjs().hour(6).minute(0);
    const end = dayjs().hour(22).minute(0);

    while (current.isSameOrBefore(end)) {
      const formatted = current.format('hh:mm A');

      if (!minTime || current.isAfter(dayjs(minTime, 'hh:mm A'))) {
        options.push(formatted);
      }

      current = current.add(30, 'minute');
    }

    return options;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white border rounded-md flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{value || placeholder}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {generateTimeOptions().map(time => (
            <button
              key={time}
              onClick={() => {
                console.log('[TIME SELECTED]', time);
                onChange(time);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-blue-50"
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ServiceSlotCard: React.FC<ServiceSlotCardProps> = ({ service, onCreateSlot, onDeleteSlot }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  console.log(service);

  const validateTimeSlot = (start: string, end: string) => {
    if (!start || !end) return 'Please select both times';

    const todayIST = dayjs().tz(IST_TIMEZONE).format('YYYY-MM-DD');

    const selectedStartIST = dayjs.tz(`${todayIST} ${start}`, 'YYYY-MM-DD hh:mm A', IST_TIMEZONE);

    const selectedEndIST = dayjs.tz(`${todayIST} ${end}`, 'YYYY-MM-DD hh:mm A', IST_TIMEZONE);

    const nowIST = dayjs().tz(IST_TIMEZONE);

    /* ❌ Past time validation */
    if (selectedStartIST.isSameOrBefore(nowIST)) {
      return 'Please select a future time';
    }

    /* ❌ End before start */
    if (selectedEndIST.isSameOrBefore(selectedStartIST)) {
      return 'End time must be after start time';
    }

    /* ❌ Overlap validation */
    const hasOverlap = service.slots.some(slot => {
      const slotStartIST = dayjs(slot.startTime).tz(IST_TIMEZONE);
      const slotEndIST = dayjs(slot.endTime).tz(IST_TIMEZONE);

      return selectedStartIST.isBefore(slotEndIST) && selectedEndIST.isAfter(slotStartIST);
    });

    console.log('[SLOT VALIDATION]', {
      start,
      end,
      selectedStartIST: selectedStartIST.format(),
      nowIST: nowIST.format(),
      hasOverlap,
    });

    if (hasOverlap) return 'This slot overlaps with an existing slot';

    return '';
  };

  const handleAddSlot = () => {
    const validationError = validateTimeSlot(startTime, endTime);

    if (validationError) {
      setError(validationError);
      return;
    }

    const startDate = timeStringToDate(startTime);
    const endDate = timeStringToDate(endTime);

    console.log('[CREATE SLOT]', {
      startTime,
      endTime,
      startDate,
      endDate,
    });

    onCreateSlot(startDate, endDate);

    setStartTime('');
    setEndTime('');
    setError('');
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setError('');

    if (!endTime) {
      setEndTime(dayjs(time, 'hh:mm A').add(1, 'hour').format('hh:mm A'));
    }
  };

  return (
    <div className="bg-base-200 shadow-lg rounded-xl">
      <div className="p-6">
        <div className="p-6 bg-primary/15 text-primary-content rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 overflow-hidden rounded-lg shadow-md">
              <img src={service.serviceImage} alt={service.serviceName} className="object-cover w-full h-full" />
            </div>

            <div>
              <h2 className="text-xl font-bold  text-primary  ">{service.serviceName}</h2>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {service.slots.length === 0 && <p className="text-sm text-gray-500">No slots created yet</p>}

          {service.slots.map(slot => (
            <div key={slot._id} className="flex justify-between items-center p-3 rounded-lg bg-green-100">
              <span>
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </span>

              <button
                onClick={() => {
                  console.log('[DELETE SLOT]', slot._id);
                  onDeleteSlot(slot._id);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <TimePickerDropdown value={startTime} onChange={handleStartTimeChange} placeholder="Start Time" />

          <TimePickerDropdown
            value={endTime}
            onChange={time => {
              setEndTime(time);
              setError('');
            }}
            placeholder="End Time"
            minTime={startTime}
          />

          {error && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            onClick={handleAddSlot}
            className="w-full py-2 bg-success text-white rounded-lg flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlotCard;
