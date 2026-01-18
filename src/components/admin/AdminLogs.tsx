import React, { useEffect, useState } from 'react';
import { adminGetRequest } from '../../utils/AxiosAdmin';
import { RefreshCcw } from 'lucide-react';
<<<<<<< HEAD
=======
import LoadingSpinner from '../ui/LoadingSpinner';
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = () => {
    setLoading(true);
    adminGetRequest('/admin/logs')
      .then(res => {
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
<<<<<<< HEAD
    <>
=======
<<<<<<< HEAD
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Server Logs</h2>
=======
      <>

>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="p-4 rounded shadow">
<<<<<<< HEAD
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-xl font-bold ">Server Logs</h2>
              <button onClick={fetchLogs} className="p-2 transition rounded hover:bg-gray-200" title="Refresh Logs">
                <RefreshCcw className={`${loading ? 'animate-spin' : ''}`} />
              </button>
=======

      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-bold ">Server Logs</h2>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        <button
          onClick={fetchLogs}
          className="p-2 transition rounded hover:bg-gray-200"
          title="Refresh Logs"
        >
          <RefreshCcw className={`${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
<<<<<<< HEAD

      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-[550px] whitespace-pre-wrap">
          {logs}
        </pre>
      )}
    </div>
=======
       <pre className=" p-4  bg-base-300 rounded text-sm text-base-content overflow-auto max-h-[550px] whitespace-pre-wrap">
          {logs}
        </pre>
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
            </div>
            <pre className=" p-4  bg-base-300 rounded text-sm text-base-content overflow-auto  whitespace-pre-wrap">
              {logs}
            </pre>
          </div>
        </>
      )}
<<<<<<< HEAD
    </>
=======
      </>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
  );
};

export default AdminLogs;
