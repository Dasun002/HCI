import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import SocialCircle from '../components/SocialCircle';

export default function SocialScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Social & Private Circles</Text>
        <Text style={styles.description}>
          Compete in challenges and stay accountable with your trusted fitness circles via Firebase real-time sync.
        </Text>
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
