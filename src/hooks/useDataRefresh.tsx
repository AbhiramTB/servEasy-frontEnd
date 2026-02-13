import { useEffect } from 'react';
import { connectSocket } from '../utils/socket';

const useDataRefresh = (reload: () => void) => {
  useEffect(() => {
    const socket = connectSocket();

    const handleRefresh = () => {
      reload();
    };

    socket.on('refreshData', handleRefresh);

    return () => {
      socket.off('refreshData', handleRefresh);
    };
  }, [reload]);
};

export default useDataRefresh;
