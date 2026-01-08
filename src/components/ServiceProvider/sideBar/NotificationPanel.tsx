import React, { forwardRef } from 'react';
import { Bell, Clock } from 'lucide-react';
import { ISavedNotification } from '../../../utils/types/INotification';

interface Props {
  notifications: ISavedNotification[];
  notificationCount: number;
  onClose: () => void;
  onClear: () => void;
}

const NotificationPanel = forwardRef<HTMLDivElement, Props>(
  ({ notifications, notificationCount, onClose, onClear }, ref) => {
    return (
      <div ref={ref} className="fixed z-50 right-4 top-20 w-[400px] bg-base-100 border rounded-2xl">
        <div className="p-4 flex justify-between border-b">
          <h3 className="font-bold">Notifications</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-2 max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center py-10 opacity-50">
              <Bell size={40} />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n._id} className="p-3 border rounded-xl">
                <p>{n.content}</p>
                <div className="text-xs flex items-center gap-1 opacity-60">
                  <Clock size={12} />
                  {new Date(n.notificationTime).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 border-t text-center">
            <button onClick={onClear} className="btn btn-ghost btn-xs">
              Clear All
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default NotificationPanel;
