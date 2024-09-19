import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Button,
  IconButton,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";

const Courses = ({ enrolledCourses, setEnrolledCourses }) => {
  // Initialize availableCourses state
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: 1,
      name: "AWS",
      duration: "4 weeks",
      image: require("../assets/images/aws.png"),
    },
    {
      id: 2,
      name: "AI and NLP",
      duration: "6 weeks",
      image: require("../assets/images/ai.jpg"),
    },
    {
      id: 3,
      name: "Azure",
      duration: "6 weeks",
      image: require("../assets/images/azure.jpg"),
    },
    {
      id: 4,
      name: "CSS",
      duration: "6 weeks",
      image: require("../assets/images/css.jpg"),
    },
    {
      id: 5,
      name: "Docker",
      duration: "6 weeks",
      image: require("../assets/images/docekr.png"),
    },
    {
      id: 6,
      name: "GitHub",
      duration: "6 weeks",
      image: require("../assets/images/github.png"),
    },
    {
      id: 7,
      name: "HTMl",
      duration: "6 weeks",
      image: require("../assets/images/html.png"),
    },
    {
      id: 8,
      name: "JavaScript",
      duration: "6 weeks",
      image: require("../assets/images/javascript.png"),
    },
    {
      id: 9,
      name: "MongoDB",
      duration: "6 weeks",
      image: require("../assets/images/mongoDb.png"),
    },
    {
      id: 10,
      name: "Node.js",
      duration: "6 weeks",
      image: require("../assets/images/node.png"),
    },
    {
      id: 11,
      name: "Oracle",
      duration: "6 weeks",
      image: require("../assets/images/oracle.png"),
    },
    {
      id: 12,
      name: "SQL",
      duration: "6 weeks",
      image: require("../assets/images/sql.png"),
    },
  ]);

  const handleEnroll = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some(
      (enrolledCourse) => enrolledCourse.id === course.id
    );

    if (isAlreadyEnrolled) {
      // Add the course to the enrolled courses list
      setEnrolledCourses([...enrolledCourses, course]);

      // Remove the course from the available courses list
      setAvailableCourses(availableCourses.filter((c) => c.id !== course.id));
      alert("You are already enrolled in this course.");
    } else {
      Alert.alert(
        "Confirm Enrollment",
        `Are you sure you want to enroll in ${course.name}`,
        [
          {
            text: "No",
            onPress: () => console.log("Enrollment Cancelled"),
          },
          {
            text: "Yes",
            onPress: () => {
              setEnrolledCourses([...enrolledCourses, course]);
              setAvailableCourses(
                availableCourses.filter((c) => c.id !== course.id)
              );
              console.log("Enrolled in the course", course.name);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const navigation=useNavigation();

  return (
    <View style={styles.container}>
      {availableCourses.length > 0 ? (
        <FlatList
          data={availableCourses}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.courseContainer}>
              <Image source={item.image} style={styles.courseImage} />
              <View style={styles.courseDetails}>
                <Text style={styles.courseName}>{item.name}</Text>
                <View style={styles.courseDurationContainer}>
              <Icon name="access-time" size={16} />
              <Text style={styles.courseDuration}>{item.duration}</Text>
            </View>
            
                <View style={styles.buttonContainer}>
                  <IconButton
                    icon="heart-outline"
                    size={20}
                    style={{backgroundColor:"#FFF"}}
                    onPress={() => console.log("Added to Wishlist")}
                  />
                  <Button
                    mode="contained"
                    onPress={() => navigation.navigate("CourseDetail")}
                  >
                    View Course
                  </Button>
                  <Button mode="contained" onPress={() => handleEnroll(item)} style={{margin:5}}>
                    Enroll
                  </Button>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No more available courses to enroll.</Text>
      )}
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: 150,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    margin: 8,
  },
  courseDurationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 8
  },
  courseDuration: {
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#0f4c75'
  },
});
