import React, { useState } from "react";
import { ISlot } from "../../utils/types/ISlot";

interface SlotSelectorProps {
  slots: ISlot[];
  onSelect: (slotId: string) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({ slots, onSelect }) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const handleSelect = (slot: ISlot) => {
    if (!slot.booked) {
      setSelectedSlotId(slot._id);
      onSelect(slot._id);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot._id;

        return (
          <button
            key={slot._id}
            onClick={() => handleSelect(slot)}
            disabled={slot.booked}
            className={`px-4 py-2 rounded-lg border transition-all
              ${
                slot.booked
                  ? "bg-base text-muted-foreground cursor-not-allowed border-border"
                  : isSelected
                  ? "bg-primary text-primary-content border-2 border-primary"
                  : "bg-base-300 text-base-content hover:bg-primary/15 hover:text-accent-foreground border-border"
              }`}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        );
      })}
    </div>
  );
};

export default SlotSelector;
