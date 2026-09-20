import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import DailyFlowCard from '../components/DailyFlowCard';
import WorkoutTracker from '../components/WorkoutTracker';
import NutritionUpload from '../components/NutritionUpload';
import SocialCircle from '../components/SocialCircle';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Dasun 👋</Text>
            <Text style={styles.subtext}>Ready for today's personalized flow?</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakCount}>12 Days</Text>
          </View>
        </View>

        {/* AI Daily Flow Card */}
        <DailyFlowCard 
          onStartWorkout={() => {
            if (navigation) navigation.navigate('Workout');
          }}
        />

        {/* Active Routine Sets */}
        <WorkoutTracker />

        {/* Meal Photo Nutrition Scanner */}
        <NutritionUpload />

        {/* Social Feed Sync */}
        <SocialCircle />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  subtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  streakCount: {
    color: '#FBBF24',
    fontWeight: '700',
    fontSize: 14,
  },
});
