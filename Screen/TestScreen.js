import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const TestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { testName } = route.params;

  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(100); // 100 seconds timer for each question
  const [completed, setCompleted] = useState(false);

  // Use the testData directly instead of "questions"
  const questionSet = testData?.sections || [];

  useEffect(() => {
    setTimer(100); // Reset timer to 100 seconds when a new question is loaded
  }, [currentQuestion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleNextQuestion(); // Move to next question after timer ends
          return 100; // Reset timer for next question
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption; // Store the answer
    setAnswers(updatedAnswers);

    if (currentQuestion < questionSet.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Reset selected option
    } else {
      setCompleted(true); // Mark test as completed
      showResult();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]); // Restore previously selected answer
    }
  };

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch("http://10.50.1.14:4000/testName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ testName }),
        });
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestData(data);
      } catch (err) {
        setError("Failed to load test Details");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestDetails();
  }, [testName]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!testData || !testData.sections) {
    return (
      <View style={styles.center}>
        <Text>No test data available</Text>
      </View>
    );
  }

  const showResult = () => {
    const attempted = answers.filter((answer) => answer !== null).length;
    const correct = answers.filter(
      (answer, idx) => answer === questionSet[idx].correct
    ).length;
    const incorrect = attempted - correct;
    const accuracy = (correct / questionSet.length) * 100;

    navigation.navigate("ResultScreen", {
      attempted,
      correct,
      incorrect,
      accuracy,
    });
  };

  if (completed || questionSet.length === 0) return null; // Hide content if test is completed or no questions

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <View style={styles.container}>
      {/* Test Name and Timer */}
      <View style={styles.header}>
        <Text style={styles.testName}>{testData.testName}</Text>
        <Text style={styles.timer}>Time left: {timer}s</Text>
      </View>

      {/* Question and Options */}
      <Text style={styles.question}>
        {currentQuestion + 1}: {testData.sections[currentQuestion].question}
      </Text>

      <RadioButton.Group
        onValueChange={(value) => setSelectedOption(value)}
        value={selectedOption}
      >
        {testData.sections[currentQuestion].options.map((option, idx) => (
          <RadioButton.Item
            key={idx}
            label={`${optionLabels[idx]}. ${option}`}
            value={idx}
          />
        ))}
      </RadioButton.Group>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Prev"
          onPress={handlePrevQuestion}
          disabled={currentQuestion === 0}
        />
        <Button title="Next" onPress={handleNextQuestion} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  testName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 16,
    color: "red",
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TestScreen;
