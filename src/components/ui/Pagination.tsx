import React from 'react';

interface IProps {
  crrPage: number;
  dataLimit: number;
  totaldata: number;
  fetchData: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({ crrPage, dataLimit, totaldata, fetchData }) => {
  return (
    <div className="flex justify-center mt-10 mb-10 join">
      <button
        className="text-3xl font-bold join-item btn bg-primary text-primary-content"
        onClick={() => fetchData(crrPage - 1)}
        disabled={crrPage === 0}
      >
        «
      </button>

      <button className="join-item btn bg-base-300">
        Page {crrPage + 1}
      </button>

      <button
        className="text-3xl font-bold join-item btn bg-primary text-primary-content"
        onClick={() => fetchData(crrPage + 1)}
        disabled={(crrPage + 1) * dataLimit >= totaldata}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;