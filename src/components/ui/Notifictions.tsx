import React, { useState } from 'react';
import { Trash2, CheckCircle, X } from 'lucide-react';
import { ISavedNotification } from '../../utils/types/INotification';
import { HotToastSuccess } from '../../utils/notificationToast';
import { getRequest,deleteRequest,patchRequest } from '../../utils/makeRequestInstance';

interface Props {
  notifications: ISavedNotification[] | null;
  decrementUnreadCount:()=>void
}

const Notifications: React.FC<Props> = ({ notifications,decrementUnreadCount }) => {
  const [localNotifications, setLocalNotifications] = useState<ISavedNotification[]>(notifications || []);

   const clearAllNotifications =async () => {
    setLocalNotifications([]);
    await deleteRequest("/notification/deleteAll")
    HotToastSuccess("All notifications cleared");
  };

  const removeNotification = async (id: string) => {
    await deleteRequest("/notification/"+id)

    setLocalNotifications(prev => prev.filter(n => n._id !== id));
  };

  const markAsRead = async (id: string) => {
    decrementUnreadCount()
    await patchRequest("/notification/"+id,{})
  

    setLocalNotifications(prev =>
      prev.map(n => (n._id === id ? { ...n, read: true } : n))
    );
  };



  return (
    <div>
      {notifications && (
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
              localNotifications.map(notification => (
                <div
                  key={notification._id}
                  className={`p-4 border-b border-base-200 hover:bg-base-100 rounded-lg shadow-sm mb-2 ${
                    notification.read ? 'bg-opacity-50' : 'border-l-4 border-l-primary'
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
                        {notification.notificationTime}
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
              <div className="p-4 text-center text-base-content text-opacity-70">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
