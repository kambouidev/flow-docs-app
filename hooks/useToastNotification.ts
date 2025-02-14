import Toast from 'react-native-toast-message';
import { useNotificationsStore } from '../stores/notifications.store';
import { INotification } from '../types/INotification';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useToastNotification() {
  const { addNotification } = useNotificationsStore();
  const router = useRouter();
  const segment = useSegments();

  useEffect(() => {
    Toast.hide();
  }, [segment]);

  const showNotification = (newNotification: INotification) => {
    addNotification(newNotification);
    Toast.show({
      type: 'newNotification',
      autoHide: true,
      visibilityTime: 2000,
      props: {
        type: 'info',
        userName: newNotification.UserName,
        redirect: () => router.push('/notifications'),
      },
    });
  };

  return { showNotification };
}
