import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

interface AnimatedModalProps {
  visible: boolean;
  onClose: () => void;
}

export function useAnimatedModal({ visible, onClose }: AnimatedModalProps) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(modalTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }),
      ]).start();
    }
  }, [visible]);

  const handleCloseAnimation = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(modalTranslateY, {
        toValue: Dimensions.get('window').height,
        useNativeDriver: true,
        bounciness: 0,
      }),
    ]).start(onClose);
  };

  return { overlayOpacity, modalTranslateY, handleCloseAnimation };
}
