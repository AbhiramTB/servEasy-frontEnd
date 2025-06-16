import React, { useEffect, useState } from "react";
import { getMinMaxDateTime } from "../../../utils/getMinMaxDateTime";

type TimeSlot = "morning" | "afternoon" | "anyTime";

export interface ServiceDateTime {
  date: Date;
  time: TimeSlot;
}

interface ServiceDateTimePickerProps {
  value?: ServiceDateTime;
  setValue?: (dateTime: ServiceDateTime) => void;
  daysToAdd?: number;
  label?: string;
}

const ServiceDateTimePicker: React.FC<ServiceDateTimePickerProps> = ({
  value,
  setValue,
  daysToAdd = 1,
  label = "Preferred Service Time Slot",
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { min, max } = getMinMaxDateTime(daysToAdd);

  const serviceSessions = [
    {
      id: "morning",
      label: "Morning",
      time: "8:00 AM - 1:00 PM",
      value: "08:00-13:00",
      icon: "🌅"
    },
    {
      id: "afternoon", 
      label: "Afternoon",
      time: "2:00 PM - 5:00 PM",
      value: "14:00-17:00",
      icon: "☀️"
    },
    {
      id: "anyTime",
      label: "Any Time",
      time: "Flexible timing",
      value: "anyTime",
      icon: "🕐"
    }
  ];

  useEffect(() => {
    if (value) {
      // Convert Date to YYYY-MM-DD format for input
      const dateStr = value.date.toISOString().split('T')[0];
      setSelectedDate(dateStr);
      setSelectedSession(value.time);
    } else {
      // Set default values - today's date and anyTime
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      setSelectedDate(todayStr);
      setSelectedSession("anyTime");
      
      // Set the default value
      setValue?.({
        date: today,
        time: "anyTime"
      });
    }
  }, [value, setValue]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setSelectedDate(dateStr);
    setError(null);
    
    if (dateStr && selectedSession) {
      const selectedDate = new Date(dateStr);
      const newDateTime: ServiceDateTime = {
        date: selectedDate,
        time: selectedSession as TimeSlot
      };
      validateAndSetDateTime(newDateTime);
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
    setError(null);
    
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      const newDateTime: ServiceDateTime = {
        date: selectedDateObj,
        time: sessionId as TimeSlot
      };
      validateAndSetDateTime(newDateTime);
    }
  };

  const validateAndSetDateTime = (dateTime: ServiceDateTime) => {
    // If "anyTime" is selected, skip datetime validation for time but still check date
    if (dateTime.time === "anyTime") {
      const now = new Date();
      const minDate = new Date(min);
      const maxDate = new Date(max);

      // Check if date is in valid range
      if (dateTime.date < minDate || dateTime.date > maxDate) {
        setError(`Please choose between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`);
        return;
      }

      setError(null);
      setValue?.(dateTime);
      return;
    }
    
    // For specific time slots, validate against current time
    const now = new Date();
    const minDate = new Date(min);
    const maxDate = new Date(max);

    // Check date range
    if (dateTime.date < minDate || dateTime.date > maxDate) {
      setError(`Please choose between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`);
      return;
    }

    // Check if it's today and the time slot has passed
    const today = new Date();
    if (dateTime.date.toDateString() === today.toDateString()) {
      const currentHour = now.getHours();
      
      if (dateTime.time === "morning" && currentHour >= 13) {
        setError("Morning session has already passed for today.");
        return;
      }
      
      if (dateTime.time === "afternoon" && currentHour >= 17) {
        setError("Afternoon session has already passed for today.");
        return;
      }
    }

    setError(null);
    setValue?.(dateTime);
  };

  const isSessionDisabled = (sessionId: string) => {
    if (!selectedDate) return true;
    
    // For "anyTime", never disable it
    if (sessionId === "anyTime") return false;
    
    const now = new Date();
    const selectedDateObj = new Date(selectedDate);
    
    // If it's not today, allow all sessions
    if (selectedDateObj.toDateString() !== now.toDateString()) {
      return false;
    }
    
    // If it's today, check if the session has passed
    const currentHour = now.getHours();
    
    if (sessionId === "morning" && currentHour >= 13) {
      return true; // Morning session has passed
    }
    
    if (sessionId === "afternoon" && currentHour >= 17) {
      return true; // Afternoon session has passed
    }
    
    return false;
  };

  const minDateForInput = min.split('T')[0];
  const maxDateForInput = max.split('T')[0];

  return (
    <div className="w-full max-w-md p-4 mx-auto bg-base-100 rounded-xl">
      {/* Compact Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-base-content">{label}</h3>
      </div>

      {/* Date and Session in Grid */}
      <div className="grid grid-cols-1 gap-3 mb-3">
        {/* Date Selection */}
        <div>
          <label className="block mb-2 text-xs font-medium text-base-content">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDateForInput}
            max={maxDateForInput}
            className="w-full px-3 py-2 text-sm transition-colors border rounded-lg border-base-300 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-base-200 text-base-content"
          />
        </div>

        {/* Service Session Selection */}
        <div>
          <label className="block mb-2 text-xs font-medium text-base-content">
            Time Slot
          </label>
          <div className="grid grid-cols-3 gap-2">
            {serviceSessions.map((session) => {
              const isSelected = selectedSession === session.id;
              const isDisabled = isSessionDisabled(session.id);
              
              return (
                <button
                  key={session.id}
                  onClick={() => handleSessionSelect(session.id)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-center rounded-lg border text-xs transition-colors
                    ${isSelected
                      ? 'bg-primary text-primary-content border-primary'
                      : isDisabled
                      ? 'bg-base-300 text-base-content/40 border-base-300 cursor-not-allowed'
                      : 'bg-base-200 text-base-content border-base-300 hover:border-primary/50'
                    }
                  `}
                >
                  <div className="mb-1 text-sm">{session.icon}</div>
                  <div className="font-medium">{session.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compact Selected Summary */}
      {selectedDate && selectedSession && !error && (
        <div className="p-2 mb-3 border rounded-lg border-success/30 bg-success/10">
          <span className="text-xs text-success">
            ✓ {new Date(selectedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })} - {serviceSessions.find(s => s.id === selectedSession)?.label}
          </span>
        </div>
      )}

      {/* Compact Error Message */}
      {error && (
        <div className="p-2 mb-3 border rounded-lg border-error/30 bg-error/10">
          <span className="text-xs text-error">⚠ {error}</span>
        </div>
      )}

      {/* Compact Helper Text */}
      <div className="text-xs text-center text-base-content/50">
        Local timezone
      </div>
    </div>
  );
};

export default ServiceDateTimePicker;