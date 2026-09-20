import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function NutritionUpload({ onScanComplete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const simulateScan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        dish: 'Grilled Salmon with Avocado Salad & Quinoa',
        confidence: '96.4%',
        calories: 520,
        protein: '42g',
        carbs: '38g',
        fat: '22g'
      });
      if (onScanComplete) {
        onScanComplete();
      }
    }, 1200);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📸 AI Computer Vision Nutrition Logger</Text>
      <Text style={styles.subtitle}>Take a photo of your plate to auto-calculate macronutrients</Text>

      <TouchableOpacity 
        style={styles.cameraButton} 
        onPress={simulateScan} 
        disabled={analyzing}
      >
        {analyzing ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.cameraButtonText}>Capture / Upload Plate Photo</Text>
        )}
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.detectedDish}>{result.dish}</Text>
          <Text style={styles.confidence}>Confidence: {result.confidence} (CV Microservice)</Text>
          
          <View style={styles.macroRow}>
            <View style={styles.macroBadge}>
              <Text style={styles.macroVal}>{result.calories}</Text>
              <Text style={styles.macroLabel}>kcal</Text>
            </View>
            <View style={styles.macroBadge}>
              <Text style={styles.macroVal}>{result.protein}</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroBadge}>
              <Text style={styles.macroVal}>{result.carbs}</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroBadge}>
              <Text style={styles.macroVal}>{result.fat}</Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 14,
  },
  cameraButton: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  resultBox: {
    marginTop: 14,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  detectedDish: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  confidence: {
    color: '#34D399',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroBadge: {
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
  },
  macroVal: {
    color: '#F8FAFC',
    fontWeight: 'bold',
    fontSize: 14,
  },
  macroLabel: {
    color: '#94A3B8',
    fontSize: 11,
  },
});
