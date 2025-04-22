import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');
const LANE_WIDTH = width / 3;

type RoadProps = {
  gameSpeed: Animated.SharedValue<number>;
};

export default function Road({ gameSpeed }: RoadProps) {
  const stripeOffset = useSharedValue(0);

  // Create animated road stripes
  useEffect(() => {
    stripeOffset.value = withRepeat(
      withTiming(200, { 
        duration: 1000, 
        easing: Easing.linear 
      }),
      -1,
      false
    );
  }, []);

  // Animated style for the road stripes
  const animatedStripeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: stripeOffset.value }],
    };
  });

  // Generate lane markers
  const renderLaneMarkers = () => {
    const markers = [];
    for (let i = 1; i < 3; i++) {
      markers.push(
        <View 
          key={`lane-${i}`} 
          style={[styles.laneMarker, { left: i * LANE_WIDTH - 2 }]} 
        />
      );
    }
    return markers;
  };

  // Generate road stripes
  const renderRoadStripes = () => {
    const stripes = [];
    const stripeCount = Math.ceil(height / 80) + 1;
    
    for (let i = 0; i < stripeCount; i++) {
      stripes.push(
        <View 
          key={`stripe-${i}`} 
          style={[styles.roadStripe, { top: i * 80 - 40 }]} 
        />
      );
    }
    
    return stripes;
  };

  return (
    <View style={styles.road}>
      <View style={styles.roadBackground} />
      {renderLaneMarkers()}
      <Animated.View style={[styles.stripeContainer, animatedStripeStyle]}>
        {renderRoadStripes()}
      </Animated.View>
      <View style={styles.roadEdgeLeft} />
      <View style={styles.roadEdgeRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  road: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#333333',
    overflow: 'hidden',
  },
  roadBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#333333',
  },
  laneMarker: {
    position: 'absolute',
    width: 4,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  stripeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  roadStripe: {
    position: 'absolute',
    width: 10,
    height: 40,
    backgroundColor: '#FFFFFF',
    left: '50%',
    marginLeft: -5,
  },
  roadEdgeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#FF6B6B',
  },
  roadEdgeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#FF6B6B',
  },
});