import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Volume2, Volume1, VolumeX, Vibrate, Car } from 'lucide-react-native';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [selectedCar, setSelectedCar] = useState('red');

  const cars = [
    { id: 'red', name: 'Red Racer', color: '#FF6B6B' },
    { id: 'blue', name: 'Blue Bolt', color: '#4ECDC4' },
    { id: 'yellow', name: 'Yellow Flash', color: '#FFD166' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sound & Haptics</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Volume2 size={24} color="#FFFFFF" />
            <Text style={styles.settingLabel}>Music</Text>
          </View>
          <Switch
            value={musicEnabled}
            onValueChange={setMusicEnabled}
            trackColor={{ false: '#333', true: '#FF6B6B' }}
            thumbColor={musicEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Volume1 size={24} color="#FFFFFF" />
            <Text style={styles.settingLabel}>Sound Effects</Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#333', true: '#FF6B6B' }}
            thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Vibrate size={24} color="#FFFFFF" />
            <Text style={styles.settingLabel}>Vibration</Text>
          </View>
          <Switch
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            trackColor={{ false: '#333', true: '#FF6B6B' }}
            thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Selection</Text>
        <Text style={styles.sectionDescription}>Choose your racing vehicle</Text>
        
        <View style={styles.carSelector}>
          {cars.map(car => (
            <TouchableOpacity
              key={car.id}
              style={[
                styles.carOption,
                { borderColor: car.id === selectedCar ? car.color : 'transparent' }
              ]}
              onPress={() => setSelectedCar(car.id)}
            >
              <View style={[styles.carIcon, { backgroundColor: car.color }]}>
                <Car size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.carName}>{car.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Information</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How to Play</Text>
          <Text style={styles.infoText}>• Swipe left and right to move your car</Text>
          <Text style={styles.infoText}>• Avoid obstacles on the road</Text>
          <Text style={styles.infoText}>• The longer you survive, the higher your score</Text>
          <Text style={styles.infoText}>• Game speed increases over time</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Papa Kart v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Audiowide-Regular',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'Audiowide-Regular',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  carSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  carOption: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 10,
  },
  carIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  carName: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#DDDDDD',
    marginBottom: 8,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  version: {
    color: '#666666',
    fontSize: 12,
  },
});