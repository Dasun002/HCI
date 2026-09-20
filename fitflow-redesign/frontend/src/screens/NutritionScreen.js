import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import NutritionUpload from '../components/NutritionUpload';

export default function NutritionScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nutrition & Meal Intelligence</Text>
        <Text style={styles.description}>
          Snap a picture of your dish. Our Computer Vision service detects ingredients and calculates macronutrients instantly.
        </Text>
        <NutritionUpload />
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
