import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getMinMaxDateTime } from '../../../../utils/getMinMaxDateTime';
import { IServiceDateTime, ITimeSlot } from '../../../../utils/types/booking';

export interface ProviderWorkingTime {
  start: string;
  end: string;
}

interface ServiceDateTimePickerProps {
  value?: IServiceDateTime;
  setValue?: (dateTime: IServiceDateTime) => void;
  daysToAdd?: number;
  label?: string;
  providerWorkingTime?: ProviderWorkingTime;
}

const ServiceDateTimePicker: React.FC<ServiceDateTimePickerProps> = ({
  value,
  setValue,
  daysToAdd = 1,
  label = 'Preferred Service Time',
  providerWorkingTime,
}) => {
  const { min, max } = getMinMaxDateTime(daysToAdd);

  const [selectedDate, setSelectedDate] = useState<Date>(value?.date ?? new Date());
  const [selectedSlot, setSelectedSlot] = useState<ITimeSlot>(value?.time || 'anyTime');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) return;
    setSelectedDate(dayjs(value.date).toDate());
    setSelectedSlot(value.time);
  }, [value]);

  const sessions = useMemo(() => {
    const base = [
      { id: 'morning', label: 'Morning', icon: '🌅', start: 8, end: 13 },
      { id: 'afternoon', label: 'Afternoon', icon: '☀️', start: 14, end: 17 },
      { id: 'anyTime', label: 'Any Time', icon: '🕐' },
    ] as const;

    if (!providerWorkingTime) return base;

    const startHour = dayjs(providerWorkingTime.start, 'HH:mm').hour();
    const endHour = dayjs(providerWorkingTime.end, 'HH:mm').hour();

    return base.filter(s => {
      if (s.id === 'anyTime') return true;
      return s.start >= startHour && s.end <= endHour;
    });
  }, [providerWorkingTime]);

  const validateAndSet = (date: Date, slot: ITimeSlot) => {
    const selected = dayjs(date);
    const now = dayjs();

    if (!selected.isValid()) return;

    if (selected.isBefore(dayjs(min), 'day') || selected.isAfter(dayjs(max), 'day')) {
      setError('Selected date is out of allowed range');
      return;
    }

    if (selected.isSame(now, 'day')) {
      if (slot === 'morning' && now.hour() >= 13) {
        setError('Morning slot has already passed');
        return;
      }
      if (slot === 'afternoon' && now.hour() >= 17) {
        setError('Afternoon slot has already passed');
        return;
      }
    }

    setError(null);
    setValue?.({ date, time: slot });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = dayjs(e.target.value, 'YYYY-MM-DD').toDate();
    setSelectedDate(date);
    validateAndSet(date, selectedSlot);
  };
  const handleSlotSelect = (slot: ITimeSlot) => {
    setSelectedSlot(slot);
    validateAndSet(selectedDate, slot);
  };

  const isSlotDisabled = (slot: ITimeSlot) => {
    if (slot === 'anyTime') return false;

    const selected = dayjs(selectedDate);
    const now = dayjs();

    if (!selected.isSame(now, 'day')) return false;

    if (slot === 'morning' && now.hour() >= 13) return true;
    if (slot === 'afternoon' && now.hour() >= 17) return true;

    return false;
  };

  const minDate = dayjs(min).format('YYYY-MM-DD');
  const maxDate = dayjs(max).format('YYYY-MM-DD');

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-5  ">
      <h3 className="mb-4 text-sm sm:text-base font-semibold text-base-content">{label}</h3>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block mb-1 text-xs font-medium">Select Date</label>
        <input
          type="date"
          value={dayjs(selectedDate).format('YYYY-MM-DD')}
          min={minDate}
          max={maxDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 text-sm rounded-lg border border-base-300 bg-base-300 focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Slots */}
      <div className="mb-4">
        <label className="block mb-2 text-xs font-medium">Time Slot</label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {sessions.map(slot => {
            const active = selectedSlot === slot.id;
            const disabled = isSlotDisabled(slot.id);

            return (
              <button
                key={slot.id}
                disabled={disabled}
                onClick={() => handleSlotSelect(slot.id)}
                className={`
                  p-2 sm:p-3 rounded-lg text-xs sm:text-sm border transition
                  ${
                    active
                      ? 'bg-primary text-primary-content border-primary'
                      : disabled
                        ? 'bg-base-300 text-base-content/40 border-base-300 cursor-not-allowed'
                        : 'bg-base-200 border-base-300 hover:border-primary/50'
                  }
                `}
              >
                <div className="text-base sm:text-lg">{slot.icon}</div>
                <div className="font-medium">{slot.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {!error && (
        <div className="mb-3 p-2 rounded-lg bg-success/10 border border-success/20 text-xs text-success">
          ✓ {dayjs(selectedDate).format('MMM D')} – {sessions.find(s => s.id === selectedSlot)?.label}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-3 p-2 rounded-lg bg-error/10 border border-error/20 text-xs text-error">⚠ {error}</div>
      )}
    </div>
  );
};

export default ServiceDateTimePicker;
