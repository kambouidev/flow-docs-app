import { atom, useAtom } from 'jotai';
import { INotification } from '../types/INotification';

const notificationsAtom = atom<INotification[]>([]);
export function useNotificationsStore() {
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const setSeenNotifications = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, seen: true })));
  };

  const unseenNotificationsCount = notifications.filter((notification) => !notification.seen).length;

  return { notifications, addNotification, setSeenNotifications, unseenNotificationsCount };
}
