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
      <Text>Questions Attempted: {attempted}</Text>
      <Text>Correct Answers: {correctQs}</Text>
      <Text>Incorrect Answers: {incorrect}</Text>
      <Text>Accuracy: {accuracy.toFixed(2)}%</Text>

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
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ResultScreen;
