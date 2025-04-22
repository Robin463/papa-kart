import { View, StyleSheet } from 'react-native';

type ObstacleProps = {
  x: number;
  y: number;
};

export default function Obstacle({ x, y }: ObstacleProps) {
  // Randomly choose an obstacle type (barrier, oil slick, or roadblock)
  const obstacleType = Math.floor(Math.random() * 3);
  
  return (
    <View style={[
      styles.obstacle, 
      { left: x, top: y },
      obstacleType === 0 ? styles.barrier : 
      obstacleType === 1 ? styles.oilSlick : styles.roadblock
    ]}>
      {obstacleType === 0 && (
        // Traffic Cone
        <>
          <View style={styles.coneBase} />
          <View style={styles.coneTop} />
          <View style={styles.coneStripe} />
        </>
      )}
      
      {obstacleType === 1 && (
        // Oil Slick
        <>
          <View style={styles.oilCenter} />
          <View style={styles.oilRipple1} />
          <View style={styles.oilRipple2} />
        </>
      )}
      
      {obstacleType === 2 && (
        // Roadblock
        <>
          <View style={styles.blockTop} />
          <View style={styles.blockBody} />
          <View style={styles.blockStripe1} />
          <View style={styles.blockStripe2} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barrier: {
    backgroundColor: 'transparent',
  },
  oilSlick: {
    backgroundColor: 'transparent',
  },
  roadblock: {
    backgroundColor: 'transparent',
  },
  // Traffic Cone Styles
  coneBase: {
    position: 'absolute',
    bottom: 0,
    width: 30,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  coneTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF6B21',
  },
  coneStripe: {
    position: 'absolute',
    bottom: 10,
    width: 20,
    height: 4,
    backgroundColor: '#FFFFFF',
  },
  // Oil Slick Styles
  oilCenter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  oilRipple1: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  oilRipple2: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  // Roadblock Styles
  blockTop: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 6,
    backgroundColor: '#555',
    borderRadius: 2,
  },
  blockBody: {
    width: 35,
    height: 30,
    backgroundColor: '#FF4444',
    borderRadius: 2,
  },
  blockStripe1: {
    position: 'absolute',
    top: 10,
    width: 35,
    height: 6,
    backgroundColor: '#FFFFFF',
  },
  blockStripe2: {
    position: 'absolute',
    top: 20,
    width: 35,
    height: 6,
    backgroundColor: '#FFFFFF',
  },
});