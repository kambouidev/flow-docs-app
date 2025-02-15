import Toast from 'react-native-toast-message';
import { useNotificationsStore } from '../stores/notifications.store';
import { INotification } from '../types/INotification';
import { useRouter, useSegments } from 'expo-router';
import { useEffect, useCallback, useRef } from 'react';
import { Audio } from 'expo-av';

export function useToastNotification() {
  const { addNotification } = useNotificationsStore();
  const router = useRouter();
  const segment = useSegments();
  const soundRef = useRef<Audio.Sound>();

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/toast-notification.wav'));
        soundRef.current = sound;
      } catch (error) {
        console.error('Error cargando sonido:', error);
      }
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    Toast.hide();
  }, [segment]);

  const playNotificationSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  const showNotification = async (newNotification: INotification) => {
    addNotification(newNotification);
    await playNotificationSound();
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
