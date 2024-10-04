import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { attempted, correctQs, incorrect, accuracy } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>Test Results</Text>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Metric</Text>
          <Text style={styles.tableCellHeader}>Value</Text>
        </View>
        
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Questions Attempted</Text>
          <Text style={styles.tableCell}>{attempted}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Correct Answers</Text>
          <Text style={styles.tableCell}>{correctQs}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Incorrect Answers</Text>
          <Text style={styles.tableCell}>{incorrect}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Accuracy</Text>
          <Text style={styles.tableCell}>{accuracy.toFixed(2)}%</Text>
        </View>
      </View>

      <Button title="Go to Home" onPress={() => navigation.navigate('Test')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b0082',
  },
  table: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  tableCell: {
    fontSize: 16,
    color: '#555',
  },
  tableRowHeader: {
    backgroundColor: '#e0e0e0',
  },
  tableRowEven: {
    backgroundColor: '#f9f9f9',
  },
});

export default ResultScreen;
