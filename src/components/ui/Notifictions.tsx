import React from 'react';
import { Trash2, CheckCircle, X } from 'lucide-react';
import { ISavedNotification } from '../../utils/types/INotification';
import { HotToastSuccess } from '../../utils/notificationToast';
import { deleteRequest, patchRequest } from '../../utils/makeRequestInstance';
import dayjs from 'dayjs';

interface Props {
  localNotifications: ISavedNotification[];
  setLocalNotifications: React.Dispatch<React.SetStateAction<ISavedNotification[]>>;
  decrementUnreadCount: () => void;
  countMakeitZero: () => void;
}
const Notifications: React.FC<Props> = ({
  localNotifications,
  setLocalNotifications,
  decrementUnreadCount,
  countMakeitZero,
}) => {
  const clearAllNotifications = async () => {
    setLocalNotifications([]);
    await deleteRequest('/notification/deleteAll');
    countMakeitZero();
    HotToastSuccess('All notifications cleared');
  };

  const removeNotification = async (id: string) => {
    await deleteRequest(`/notification/${id}`);
    setLocalNotifications((prev: ISavedNotification[]) =>
      prev.filter((n) => n._id !== id)
    );
  };

  const markAsRead = async (id: string) => {
    await patchRequest(`/notification/${id}`, {});
    decrementUnreadCount();
    setLocalNotifications((prev: ISavedNotification[]) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div>
      <div className="absolute right-0 z-50 mt-2 overflow-hidden transition-all duration-300 origin-top-right transform border rounded-lg shadow-xl w-80 bg-base-100 border-primary border-opacity-20">
        <div className="p-3 border-b border-base-300">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            {localNotifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="flex items-center text-sm text-error hover:text-error-focus"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="overflow-y-auto max-h-80">
          {localNotifications.length > 0 ? (
            localNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 border-b border-primary bg-primary/10 hover:bg-primary/5 rounded-lg shadow-sm mb-2 ${
                  notification.read
                    ? 'bg-opacity-50'
                    : 'border-l-4 border-l-primary'
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <p
                      className={`mb-1 ${
                        notification.read
                          ? 'text-base-content text-opacity-70'
                          : 'font-medium'
                      }`}
                    >
                      {notification.content}
                    </p>
                    <p className="text-xs text-base-content text-opacity-60">
                      {dayjs(notification.notificationTime).format('DD MMM YYYY, hh:mm A')}
                     
                    </p>
                  </div>
                  <div className="flex items-center ml-3 space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="p-1 transition-colors rounded-full text-primary hover:bg-base-200"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notification._id)}
                      className="p-1 transition-colors rounded-full text-base-content text-opacity-60 hover:text-error hover:bg-base-200"
                      title="Remove notification"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-accent text-opacity-70">
              No notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
