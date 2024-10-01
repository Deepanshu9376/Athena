import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  Card,
  Button,
  Checkbox,
  Modal,
  Portal,
  IconButton,
} from "react-native-paper";

const Test = () => {
  const navigation=useNavigation();
  const [visible, setVisible] = useState(false); // Modal visibility
  const [checked, setChecked] = useState(false); // Checkbox state
  const [selectedTest, setSelectedTest] = useState(null); // Track selected test

  const showModal = (test) => {
    setSelectedTest(test);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const testItems = [
    {
      id: 1,
      name: "HTML",
      questions: 10,
      duration: "30 min",
      image: require("../assets/images/html.png"),
    },
    {
      id: 2,
      name: "JavaScript",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/javascript.png"),
    },
    {
      id: 3,
      name: "Node.js",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/node.png"),
    },
    {
      id: 4,
      name: "React",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/react.png"),
    },
    {
      id: 5,
      name: "AI NLP",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/ai.jpg"),
    },
    {
      id: 6,
      name: "Azure",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/azure.jpg"),
    },
    {
      id: 7,
      name: "CSS",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/css.jpg"),
    },
    {
      id: 8,
      name: "SQL",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/sql.png"),
    },
    {
      id: 9,
      name: "Oracle",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/oracle.png"),
    },
    {
      id: 10,
      name: "MongoDB",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/mongoDb.png"),
    },
    {
      id: 11,
      name: "Github",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/github.png"),
    },
    {
      id: 12,
      name: "Docker",
      questions: 15,
      duration: "45 min",
      image: require("../assets/images/docekr.png"),
    },
    // Add more test items if necessary
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        {testItems.map((test, index) => (
          <Card
            key={test.id}
            style={styles.card}
            onPress={() => showModal(test)}
          >
            <Card.Content style={styles.cardContent}>
              {/* <IconButton icon={test.icon} size={30} /> */}
              <Image source={test.image} style={styles.testImage} />
              <Text style={styles.testName}>{test.name}</Text>
              <Text style={styles.testInfo}>{test.questions} Questions</Text>
              <Text style={styles.testInfo}>Duration: {test.duration}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Modal for instructions */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Instructions</Text>
          <Text>
            Follow the instructions carefully before starting the test:
          </Text>
          <Text>1. Do not refresh the page during the test.</Text>
          <Text>2. Ensure a stable internet connection.</Text>
          <Text>3. You have limited time to complete the test.</Text>

          <Checkbox.Item
            label="I agree to the terms and conditions"
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              disabled={!checked}
              onPress={() =>{
                setVisible(false)
                navigation.navigate("TestScreen", {
                  testName: selectedTest.name,
                })
                setChecked(!checked)
              }
              }
            >
              Start Test
            </Button>
            <Button
              mode="outlined"
              onPress={hideModal}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // 2 cards per row
    marginVertical: 10,
  },
  cardContent: {
    alignItems: "center",
  },
  testName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  testInfo: {
    fontSize: 14,
    color: "gray",
  },
  testImage: {
    width: 120,
    height: 70,
    borderRadius: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    marginLeft: 10,
  },
});
