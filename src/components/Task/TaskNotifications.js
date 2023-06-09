import React from 'react';

export default function TaskNotifications({ notifications }) {
  return (
    <div>
      <h2>Task Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          <p>Timestamp: {notification.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
