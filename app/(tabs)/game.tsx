import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  useAnimatedReaction,
  runOnJS
} from 'react-native-reanimated';
import { router } from 'expo-router';
import GameEngine from '@/components/game/GameEngine';
import Car from '@/components/game/Car';
import Obstacle from '@/components/game/Obstacle';
import Road from '@/components/game/Road';
import GameOverModal from '@/components/game/GameOverModal';

const { width, height } = Dimensions.get('window');
const MOVEMENT_SPEED = 15;
const CAR_WIDTH = 50;
const ROAD_PADDING = 8; // Width of the road edge

export default function GameScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  
  const carPosition = useSharedValue(width / 2 - CAR_WIDTH / 2);
  const gameSpeed = useSharedValue(5);
  const lastUpdateTime = useRef(Date.now());
  const animationFrameId = useRef<number | null>(null);
  const obstacles = useRef<any[]>([]);
  const isColliding = useSharedValue(false);
  
  // Ensure car is centered when component mounts
  useEffect(() => {
    const centerCar = () => {
      const centerPosition = width / 2 - CAR_WIDTH / 2;
      carPosition.value = centerPosition;
    };
    centerCar();
  }, []);
  
  // Reset game state
  const resetGame = () => {
    obstacles.current = [];
    carPosition.value = width / 2 - CAR_WIDTH / 2;
    gameSpeed.value = 5;
    setScore(0);
    setGameOver(false);
    isColliding.value = false;
    startGame();
  };
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    lastUpdateTime.current = Date.now();
    gameLoop();
  };
  
  // Game loop
  const gameLoop = () => {
    const now = Date.now();
    const dt = (now - lastUpdateTime.current) / 1000;
    lastUpdateTime.current = now;
    
    if (!gameOver) {
      setScore(prevScore => {
        const newScore = prevScore + Math.floor(dt * 10);
        gameSpeed.value = 5 + Math.min(10, Math.floor(newScore / 500));
        return newScore;
      });
      
      checkCollisions();
    }
    
    if (!gameOver) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    if (Platform.OS === 'web' && gameStarted && !gameOver) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          const newPosition = Math.max(ROAD_PADDING, carPosition.value - MOVEMENT_SPEED);
          carPosition.value = withTiming(newPosition, { duration: 100 });
        } else if (event.key === 'ArrowRight') {
          const newPosition = Math.min(width - CAR_WIDTH - ROAD_PADDING, carPosition.value + MOVEMENT_SPEED);
          carPosition.value = withTiming(newPosition, { duration: 100 });
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameStarted, gameOver]);
  
  // Pan gesture for moving the car
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (gameStarted && !gameOver) {
        const newPosition = Math.max(
          ROAD_PADDING,
          Math.min(width - CAR_WIDTH - ROAD_PADDING, carPosition.value + event.translationX)
        );
        carPosition.value = withTiming(newPosition, { duration: 100 });
      }
    });
  
  // Add new obstacle
  const addObstacle = () => {
    if (obstacles.current.length < 5 && Math.random() < 0.05) {
      const obstacleX = Math.random() * (width - 40 - ROAD_PADDING * 2) + ROAD_PADDING;
      const obstacleId = Date.now().toString();
      obstacles.current.push({
        id: obstacleId,
        x: obstacleX,
        y: -50,
        width: 40,
        height: 40,
      });
    }
  };
  
  // Update obstacle positions
  const updateObstacles = () => {
    obstacles.current = obstacles.current.filter(obstacle => {
      obstacle.y += gameSpeed.value;
      return obstacle.y < height;
    });
  };
  
  // Check for collisions
  const checkCollisions = () => {
    const carWidth = CAR_WIDTH;
    const carHeight = 80;
    
    for (const obstacle of obstacles.current) {
      if (
        carPosition.value < obstacle.x + obstacle.width &&
        carPosition.value + carWidth > obstacle.x &&
        height - 100 < obstacle.y + obstacle.height &&
        height - 100 + carHeight > obstacle.y
      ) {
        setGameOver(true);
        isColliding.value = true;
        if (score > highScore) {
          setHighScore(score);
        }
        return;
      }
    }
  };
  
  // Effects for game management
  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      if (gameStarted && !gameOver) {
        addObstacle();
        updateObstacles();
      }
    }, 100);
    
    return () => {
      clearInterval(obstacleInterval);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, gameOver]);
  
  // Animated style for the car
  const carStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: carPosition.value }],
    };
  });
  
  return (
    <GestureDetector gesture={panGesture}>
      <LinearGradient
        colors={['#222222', '#111111']}
        style={styles.container}
      >
        {!gameStarted ? (
          <View style={styles.startScreen}>
            <Text style={styles.gameTitle}>PAPA KART</Text>
            <Text style={styles.instructions}>
              {Platform.OS === 'web' 
                ? 'Use arrow keys or swipe to avoid obstacles'
                : 'Swipe left and right to avoid obstacles'}
            </Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={startGame}
            >
              <Text style={styles.startButtonText}>START GAME</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.gameContainer}>
              <Road gameSpeed={gameSpeed} />
              
              {obstacles.current.map(obstacle => (
                <Obstacle
                  key={obstacle.id}
                  x={obstacle.x}
                  y={obstacle.y}
                />
              ))}
              
              <Animated.View style={[styles.carContainer, carStyle]}>
                <Car isColliding={isColliding} />
              </Animated.View>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>SCORE: {score}</Text>
            </View>
            
            {gameOver && (
              <GameOverModal
                score={score}
                highScore={highScore}
                onRestart={resetGame}
                onHome={() => router.push({ pathname: '/(tabs)' })}
              />
            )}
          </>
        )}
      </LinearGradient>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  startScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gameTitle: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 40,
    color: '#FF6B6B',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startButtonText: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gameContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  carContainer: {
    position: 'absolute',
    bottom: 20,
    width: CAR_WIDTH,
    height: 80,
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});