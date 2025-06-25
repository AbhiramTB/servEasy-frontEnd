import React, { useState } from "react";
import { X, Clock, Plus, AlertCircle } from "lucide-react";
import { ISlot } from "../../../utils/types/ISlot";



interface IService {
  _id: string;
  serviceImage: string;
  serviceName: string;
  estimatedPrice: number;
  slots: ISlot[];
}

interface ServiceSlotCardProps {
  service: any;
  onCreateSlot: (serviceId: string, startTime: string, endTime: string) => void;
  onDeleteSlot: (serviceId: string, slotId: string) => void;
}

const TimePickerDropdown: React.FC<{
  value: string;
  onChange: (time: string) => void;
  placeholder: string;
  minTime?: string;
}> = ({ value, onChange, placeholder, minTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTime12Hour(timeString);
        
        // Skip times that are before minTime
        if (minTime && timeString <= minTime) continue;
        
        options.push({
          value: timeString,
          display: displayTime
        });
      }
    }
    return options;
  };

  const formatTime12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${
          !value ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span>{value ? formatTime12Hour(value) : placeholder}</span>
        </div>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
            {timeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                  value === option.value ? 'bg-blue-100 text-blue-600' : 'text-gray-900'
                }`}
              >
                {option.display}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ServiceSlotCard: React.FC<ServiceSlotCardProps> = ({
  service,
  onCreateSlot,
  onDeleteSlot,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const formatTime12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const validateTimeSlot = (start: string, end: string) => {
    if (!start || !end) {
      return "Please select both start and end times";
    }
    
    if (start >= end) {
      return "End time must be after start time";
    }

    // Check for overlapping slots
    const hasOverlap = service.slots.some((slot:any) => {
      return (start < slot.endTime && end > slot.startTime);
    });

    if (hasOverlap) {
      return "This time slot overlaps with an existing slot";
    }

    return "";
  };

  const handleAddSlot = () => {
    const validationError = validateTimeSlot(startTime, endTime);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onCreateSlot(service._id, startTime, endTime);
    setStartTime("");
    setEndTime("");
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setError("");
    
    // Auto-set end time to 1 hour after start time if not set
    if (time && !endTime) {
      const [hours, minutes] = time.split(':').map(Number);
      const endHour = hours + 1;
      if (endHour <= 22) {
        setEndTime(`${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    setError("");
  };

  return (
    <div className="bg-white shadow-lg  rounded-xl">
      {/* Service Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 overflow-hidden rounded-lg shadow-md">
            <img 
              src={service.serviceImage} 
              alt={service.serviceName}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{service.serviceName}</h2>
            <p className="font-semibold text-green-600">₹{service.estimatedPrice}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Available Slots */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Available Time Slots</h3>
          <div className="grid grid-cols-1 gap-2">
            {service.slots.length === 0 ? (
              <p className="text-sm italic text-gray-500">No slots available</p>
            ) : (
              service.slots.map((slot:any) => (
                <div
                  key={slot._id}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    slot.booked 
                      ? "bg-red-100 border border-red-200" 
                      : "bg-green-100 border border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={16} className={slot.booked ? "text-red-600" : "text-green-600"} />
                    <span className={`font-medium ${slot.booked ? "text-red-700" : "text-green-700"}`}>
                      {formatTime12Hour(slot.startTime)} - {formatTime12Hour(slot.endTime)}
                    </span>
                    {slot.booked && (
                      <span className="px-2 py-1 text-xs text-red-800 bg-red-200 rounded-full">
                        Booked
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteSlot(service._id, slot._id)}
                    className="p-1 transition-colors rounded-full hover:bg-gray-200"
                    title="Delete Slot"
                  >
                    <X size={16} className="text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add New Slot */}
        <div className="pt-6 border-t">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Add New Time Slot</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-600">Start Time</label>
                <TimePickerDropdown
                  value={startTime}
                  onChange={handleStartTimeChange}
                  placeholder="Select start time"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-600">End Time</label>
                <TimePickerDropdown
                  value={endTime}
                  onChange={handleEndTimeChange}
                  placeholder="Select end time"
                  minTime={startTime}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 border border-red-200 rounded-lg bg-red-50">
                <AlertCircle size={16} className="text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button 
              onClick={handleAddSlot} 
              disabled={!startTime || !endTime}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                startTime && endTime
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Plus size={18} />
              Add Time Slot
            </button>
          </div>
          
          {startTime && endTime && !error && (
            <div className="p-3 mt-3 border border-blue-200 rounded-lg bg-blue-50">
              <p className="text-sm text-blue-700">
                <strong>Preview:</strong> {formatTime12Hour(startTime)} - {formatTime12Hour(endTime)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSlotCard;