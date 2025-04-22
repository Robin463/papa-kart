import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, RefreshCw, Chrome as Home } from 'lucide-react-native';

type GameOverModalProps = {
  score: number;
  highScore: number;
  onRestart: () => void;
  onHome: () => void;
};

export default function GameOverModal({ score, highScore, onRestart, onHome }: GameOverModalProps) {
  const isNewHighScore = score >= highScore;

  return (
    <View style={styles.modalOverlay}>
      <LinearGradient
        colors={['#333333', '#222222']}
        style={styles.modalContainer}
      >
        <Text style={styles.gameOverText}>GAME OVER</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          
          {isNewHighScore ? (
            <View style={styles.newHighScoreContainer}>
              <Trophy size={24} color="#FFD700" />
              <Text style={styles.newHighScoreText}>NEW HIGH SCORE!</Text>
            </View>
          ) : (
            <View style={styles.bestScoreContainer}>
              <Text style={styles.bestScoreLabel}>BEST</Text>
              <Text style={styles.bestScoreValue}>{highScore}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>DISTANCE</Text>
            <Text style={styles.statValue}>{(score / 10).toFixed(0)}m</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TIME</Text>
            <Text style={styles.statValue}>{(score / 30).toFixed(0)}s</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.playAgainButton}
            onPress={onRestart}
          >
            <RefreshCw size={20} color="#FFFFFF" />
            <Text style={styles.playAgainText}>PLAY AGAIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={onHome}
          >
            <Home size={20} color="#FFFFFF" />
            <Text style={styles.homeText}>HOME</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  gameOverText: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 24,
    color: '#FF6B6B',
    marginBottom: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 16,
    color: '#AAAAAA',
  },
  scoreValue: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 36,
    color: '#FFFFFF',
    marginVertical: 10,
  },
  newHighScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  newHighScoreText: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 8,
  },
  bestScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bestScoreLabel: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 14,
    color: '#AAAAAA',
    marginRight: 10,
  },
  bestScoreValue: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 18,
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: '45%',
  },
  statLabel: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 12,
    color: '#AAAAAA',
  },
  statValue: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playAgainButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width: '65%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  playAgainText: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width: '30%',
  },
  homeText: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});