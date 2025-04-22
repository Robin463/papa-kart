import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Trophy, Settings } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#222222', '#111111']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.titleLogo}>PAPA KART</Text>
        <Text style={styles.subtitle}>The Ultimate Racing Challenge</Text>
      </View>

      <View style={styles.carContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/12194913/pexels-photo-12194913.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => router.push('/(tabs)/game')}
        >
          <Play color="#fff" size={24} />
          <Text style={styles.buttonText}>PLAY NOW</Text>
        </TouchableOpacity>

        <View style={styles.secondaryButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Trophy color="#fff" size={20} />
            <Text style={styles.secondaryButtonText}>Scores</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)/settings')}
          >
            <Settings color="#fff" size={20} />
            <Text style={styles.secondaryButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Swipe to control • Avoid obstacles • Set high scores</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  titleLogo: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
  },
  carContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    width: 260,
    height: 140,
    borderRadius: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Audiowide-Regular',
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Audiowide-Regular',
  },
  footer: {
    marginBottom: 30,
  },
  footerText: {
    color: '#AAAAAA',
    fontSize: 12,
    textAlign: 'center',
  },
});