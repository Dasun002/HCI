import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockFeed = [
  { id: '1', user: 'Kasun P.', action: 'completed a 5km Morning Run', time: '12m ago', likes: 8 },
  { id: '2', user: 'Anuki D.', action: 'crushed Day 14 of Upper Body Flow!', time: '45m ago', likes: 14 },
  { id: '3', user: 'Tharindu S.', action: 'logged a healthy Quinoa Bowl lunch', time: '2h ago', likes: 5 },
];

export default function SocialCircle() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>👥 Private Circle (Colombo Runners)</Text>
        <Text style={styles.liveIndicator}>🟢 Live Sync</Text>
      </View>

      {mockFeed.map(item => (
        <View key={item.id} style={styles.feedCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
          </View>
          <View style={styles.feedBody}>
            <Text style={styles.userName}>{item.user} <Text style={styles.userAction}>{item.action}</Text></Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <TouchableOpacity style={styles.likeButton}>
            <Text style={styles.likeText}>👏 {item.likes}</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  liveIndicator: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  feedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedBody: {
    flex: 1,
  },
  userName: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 14,
  },
  userAction: {
    fontWeight: '400',
    color: '#CBD5E1',
  },
  time: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  likeButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  likeText: {
    color: '#A5B4FC',
    fontSize: 13,
    fontWeight: '600',
  },
});
