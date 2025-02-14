import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface BlinkAnimationConfig {
  duration?: number;
  startOpacity?: number;
  endOpacity?: number;
}

export const useBlinkAnimation = (shouldBlink: boolean, config?: BlinkAnimationConfig) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shouldBlink) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: config?.duration || 1500,
            useNativeDriver: false,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: config?.duration || 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [shouldBlink, config?.duration]);

  const animatedBackground = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [`rgba(135, 206, 255, ${config?.startOpacity || 0.4})`, `rgba(135, 206, 255, ${config?.endOpacity || 0.9})`],
  });

  return animatedBackground;
};
