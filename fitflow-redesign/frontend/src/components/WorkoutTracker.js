import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WorkoutTracker({ exercises = [] }) {
  const [completed, setCompleted] = useState({});

  const toggleSet = (index) => {
    setCompleted(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const defaultExercises = [
    { name: 'Dumbbell Incline Bench Press', sets: '4 sets × 10 reps', target: '24 kg' },
    { name: 'Overhead Standing Military Press', sets: '3 sets × 8 reps', target: '40 kg' },
    { name: 'Hanging Leg Raises', sets: '3 sets × 15 reps', target: 'Bodyweight' }
  ];

  const list = exercises.length > 0 ? exercises : defaultExercises;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Routine & Sets</Text>
      {list.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseMeta}>{item.sets} • Target: {item.target}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.checkbox, completed[idx] && styles.checkboxDone]} 
            onPress={() => toggleSet(idx)}
          >
            <Text style={styles.checkIcon}>{completed[idx] ? '✓' : ''}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  info: {
    flex: 1,
  },
  exerciseName: {
    color: '#F1F5F9',
    fontSize: 15,
    fontWeight: '600',
  },
  exerciseMeta: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 3,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkboxDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
