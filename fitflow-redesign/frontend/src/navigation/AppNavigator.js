import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import NutritionScreen from '../screens/NutritionScreen';
import SocialScreen from '../screens/SocialScreen';

export default function AppNavigator() {
  const [currentTab, setCurrentTab] = useState('Home');

  const renderScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen navigation={{ navigate: setCurrentTab }} />;
      case 'Workout':
        return <WorkoutScreen />;
      case 'Nutrition':
        return <NutritionScreen />;
      case 'Social':
        return <SocialScreen />;
      default:
        return <HomeScreen navigation={{ navigate: setCurrentTab }} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'Home' && styles.tabItemActive]} 
          onPress={() => setCurrentTab('Home')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Home' && styles.tabLabelActive]}>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'Workout' && styles.tabItemActive]} 
          onPress={() => setCurrentTab('Workout')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Workout' && styles.tabLabelActive]}>💪 Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'Nutrition' && styles.tabItemActive]} 
          onPress={() => setCurrentTab('Nutrition')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Nutrition' && styles.tabLabelActive]}>🥗 Nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, currentTab === 'Social' && styles.tabItemActive]} 
          onPress={() => setCurrentTab('Social')}
        >
          <Text style={[styles.tabLabel, currentTab === 'Social' && styles.tabLabelActive]}>👥 Social</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  tabLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#60A5FA',
    fontWeight: '700',
  },
});
