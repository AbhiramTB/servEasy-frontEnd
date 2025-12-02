import React, { useEffect, useState } from 'react';
import { adminGetRequest } from '../../utils/AxiosAdmin';
import { RefreshCcw } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = () => {
    setLoading(true);
    adminGetRequest('/admin/logs')
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch logs');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
      <>

      {loading ? (
       <LoadingSpinner />
) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (<>
          <div className="p-4 rounded shadow">

      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-bold ">Server Logs</h2>
        <button
          onClick={fetchLogs}
          className="p-2 transition rounded hover:bg-gray-200"
          title="Refresh Logs"
        >
          <RefreshCcw className={`${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
       <pre className=" p-4  bg-base-300 rounded text-sm text-base-content overflow-auto max-h-[550px] whitespace-pre-wrap">
          {logs}
        </pre>
            </div>

      </>
       
      )}
      </>
  );
};

export default AdminLogs;
