import { StyleSheet, View } from 'react-native';
import { Car as CarIcon } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSequence, 
  withTiming, 
  withRepeat 
} from 'react-native-reanimated';
import { useEffect } from 'react';

type CarProps = {
  isColliding: Animated.SharedValue<boolean>;
};

export default function Car({ isColliding }: CarProps) {
  // Animated style for the car shake effect when colliding
  const shakeStyle = useAnimatedStyle(() => {
    if (isColliding.value) {
      return {
        transform: [
          { 
            rotate: withSequence(
              withTiming('-10deg', { duration: 100 }),
              withTiming('10deg', { duration: 100 }),
              withTiming('-10deg', { duration: 100 }),
              withTiming('10deg', { duration: 100 }),
              withTiming('0deg', { duration: 100 }),
            ) 
          }
        ],
      };
    }
    
    return {
      transform: [{ rotate: '0deg' }],
    };
  });

  return (
    <Animated.View style={[styles.carWrapper, shakeStyle]}>
      <View style={styles.car}>
        <CarIcon size={50} color="#FF6B6B" strokeWidth={2.5} />
        
        {/* Wheel effect */}
        <View style={[styles.wheel, styles.wheelFrontLeft]} />
        <View style={[styles.wheel, styles.wheelFrontRight]} />
        <View style={[styles.wheel, styles.wheelBackLeft]} />
        <View style={[styles.wheel, styles.wheelBackRight]} />
        
        {/* Car highlights */}
        <View style={styles.windshield} />
        <View style={styles.headlight} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  carWrapper: {
    width: 50,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    width: 50,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  wheel: {
    position: 'absolute',
    width: 8,
    height: 14,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  wheelFrontLeft: {
    top: 12,
    left: -4,
  },
  wheelFrontRight: {
    top: 12,
    right: -4,
  },
  wheelBackLeft: {
    bottom: 12,
    left: -4,
  },
  wheelBackRight: {
    bottom: 12,
    right: -4,
  },
  windshield: {
    position: 'absolute',
    top: 15,
    width: 30,
    height: 20,
    backgroundColor: 'rgba(200, 230, 255, 0.7)',
    borderRadius: 4,
  },
  headlight: {
    position: 'absolute',
    top: 5,
    width: 20,
    height: 6,
    backgroundColor: '#FFFF00',
    borderRadius: 3,
  },
});