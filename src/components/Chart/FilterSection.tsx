// components/admin/FilterSection.tsx
import React from 'react';

interface Props {
  startDate: string;
  endDate: string;
  loading: boolean;
  onStartDateChange: (val: string) => void;
  onEndDateChange: (val: string) => void;
  onApplyFilter: () => void;
}

const FilterSection: React.FC<Props> = ({
  startDate,
  endDate,
  loading,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
}) => (
  <section className="p-4 mb-6 bg-base-300  rounded-lg shadow">
    <h2 className="mb-3 text-lg font-semibold">Filter by Date</h2>
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label className="block mb-1 text-sm font-medium ">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => onStartDateChange(e.target.value)}
          className="px-3 py-2 border border-primary rounded-md focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium ">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={e => onEndDateChange(e.target.value)}
          className="px-3 py-2 border  border-primary  rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={onApplyFilter}
        disabled={loading}
        className="px-4 py-2 text-primary-content bg-primary rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Apply Filter'}
      </button>
    </div>
  </section>
);

export default FilterSection;
