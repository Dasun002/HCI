import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DailyFlowCard({ plan, onStartWorkout }) {
  return (
    <View style={styles.card}>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>⚡ AI ADAPTIVE DAILY FLOW</Text>
      </View>
      <Text style={styles.title}>{plan?.title || "Upper Body Power & Core Stabilization"}</Text>
      <Text style={styles.duration}>⏱ {plan?.duration || "45 mins"} • 🔥 {plan?.calories || "380 kcal"} • {plan?.difficulty || "Moderate"}</Text>
      
      <View style={styles.aiInsight}>
        <Text style={styles.aiInsightText}>
          🤖 AI Adaptation: Adjusted +2 reps on shoulder presses based on your restorative sleep score (88%) last night.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onStartWorkout} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Start Flow Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  badgeText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  duration: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
  },
  aiInsight: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  aiInsightText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
