import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import WorkoutTracker from '../components/WorkoutTracker';

export default function WorkoutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Adaptive Workout Plan</Text>
        <Text style={styles.description}>
          Generated dynamically by TensorFlow Lite on-device model based on recovery scores.
        </Text>
        <WorkoutTracker />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  description: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 16,
  },
});
