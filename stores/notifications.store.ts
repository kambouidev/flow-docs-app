import { atom, useAtom } from 'jotai';
import { INotification } from '../types/INotification';

const notificationsAtom = atom<INotification[]>([]);
export function useNotifications() {
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const setSeenNotifications = (ids: string[]) => {
    setNotifications((prev) =>
      prev.map((notification) => (ids.includes(notification.DocumentID) ? { ...notification, seen: true } : notification))
    );
  };

  const unseenNotificationsCount = notifications.filter((notification) => !notification.seen).length;

  return { notifications, addNotification, setSeenNotifications, unseenNotificationsCount };
}
