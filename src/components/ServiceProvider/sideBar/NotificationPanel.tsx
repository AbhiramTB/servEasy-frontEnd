import { forwardRef } from 'react';
import { Bell, Clock, Check } from 'lucide-react';
import { ISavedNotification } from '../../../utils/types/INotification';

interface Props {
  notifications: ISavedNotification[];
  notificationCount: number;
  onClose: () => void;
  onClear: () => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationPanel = forwardRef<HTMLDivElement, Props>(
  ({ notifications, onClose, onClear, onMarkAsRead }, ref) => {
    return (
      <div ref={ref} className="fixed z-50 right-4 top-20 w-[400px] bg-base-100 border rounded-2xl shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-bold">Notifications</h3>
          <button onClick={onClose} className="hover:opacity-70">
            ✕
          </button>
        </div>
        <div className="p-2 max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center py-10 opacity-50">
              <Bell size={40} />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n._id} className="p-3 border rounded-xl mb-2 hover:bg-base-200 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <p className="flex-1">{n.content}</p>
                  {!n.read && (
                    <button
                      onClick={() => onMarkAsRead(n._id)}
                      className="btn btn-ghost btn-xs btn-circle"
                      title="Mark as read"
                    >
                      <Check size={14} />
                    </button>
                  )}
                </div>
                <div className="text-xs flex items-center gap-1 opacity-60 mt-2">
                  <Clock size={12} />
                  {new Date(n.notificationTime).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-3 border-t flex justify-center gap-2">
            <button onClick={onClear} className="btn btn-ghost btn-xs">
              Clear All
            </button>
          </div>
        )}
      </div>
    );
  }
);

NotificationPanel.displayName = 'NotificationPanel';

export default NotificationPanel;
