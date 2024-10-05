import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Menu, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({
  enrolledCourses = [],
  completedCourses = [],
  expiredCourses = [],
}) => {
  const [selectedType, setSelectedType] = useState("ongoing");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const navigation = useNavigation();
  const filteredCourses = enrolledCourses.filter(
    (course) => course.status === selectedType
  );
  const [loginTime, setLoginTime] = useState(new Date());

  const handleButtonPress = (type) => {
    setSelectedType(type);
  };

  const openMenu = (course) => {
    setSelectedCourse(course);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setSelectedCourse(null);
    setMenuVisible(false);
  };

  const handleCoursePress = (course) => {
    setSelectedCourse(course);
    navigation.navigate("CourseDetail", { courseName: course.name });
  };

  const calculateTrainingTime = () => {
    const currentTime = new Date();
    const diff = currentTime - loginTime; // Difference in milliseconds
    const diffMinutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours.toString().padStart(2, "0")}h:${minutes
      .toString()
      .padStart(2, "0")}M`;
  };

  const getCoursesByType = () => {
    if (selectedType === "ongoing") {
      return enrolledCourses;
    } else if (selectedType === "completed") {
      return completedCourses;
    } else if (selectedType === "expired") {
      return expiredCourses;
    }
    return [];
  };

  const coursesToDisplay = getCoursesByType();

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <View style={[styles.card, styles.totalCourses]}>
          <Text style={styles.cardTitle}>Total Number of Courses:</Text>
          <Text style={styles.cardNumber}>12</Text>
          <Icon
            name="list-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
        </View>
        <View style={[styles.card, styles.ongoingCourses]}>
          <Text style={styles.cardTitle}>Ongoing Courses:</Text>
          <Text style={styles.cardNumber}>{enrolledCourses.length}</Text>
          <Icon
            name="checkmark-circle-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
        </View>
        <View style={[styles.card, styles.ongoingCourses]}>
          <Text style={styles.cardTitle}>Completed Courses:</Text>
          <Text style={styles.cardNumber}>{completedCourses.length}</Text>
          <Icon
            name="play-circle-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
        </View>
        <View style={[styles.card, styles.totalTrainingTime]}>
          <Text style={styles.cardTitle}>Total Training Time:</Text>
          <Text style={styles.cardNumber}>{calculateTrainingTime()}</Text>
          <Icon
            name="time-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
        </View>
      </View>

      {/* Buttons for Course Type Selection */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === "ongoing" && styles.activeButton,
          ]}
          onPress={() => handleButtonPress("ongoing")}
        >
          <Text style={[styles.buttonText,selectedType === "ongoing" && styles.activeButtonText]}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === "completed" && styles.activeButton,
          ]}
          onPress={() => handleButtonPress("completed")}
        >
          <Text style={[styles.buttonText,selectedType === "completed" && styles.activeButtonText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedType === "expired" && styles.activeButton,
          ]}
          onPress={() => handleButtonPress("expired")}
        >
          <Text style={[styles.buttonText,selectedType === "expired" && styles.activeButtonText]}>Expired</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Provider>
      <FlatList
        data={coursesToDisplay}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <TouchableOpacity onPress={() => handleCoursePress(item)}>
              <Image source={item.image} style={styles.courseImage} />
            </TouchableOpacity>
            <View style={styles.courseInfo}>
              <View>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Text style={styles.courseDuration}>{item.duration}</Text>
              </View>
              <TouchableOpacity onPress={() => openMenu(item)}>
                <Icon
                  name="ellipsis-vertical"
                  size={24}
                  color="#000"
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </View>
            <Menu
              visible={menuVisible && selectedCourse?.id === item.id}
              onDismiss={closeMenu}
              anchor={<View />}
            >
              <Menu.Item
                icon={() => <Icon name="eye" size={20} color="#000" />}
                onPress={() => {
                  console.log("View Certificate pressed for", item.name);
                  closeMenu();
                }}
                title="View Certificate"
              />
              <Menu.Item
                icon={() => (
                  <Icon name="document-text" size={20} color="#000" />
                )}
                onPress={() => {
                  console.log("Course Summary pressed for", item.name);
                  closeMenu();
                }}
                title="Course Summary"
              />
            </Menu>
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </Provider>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  totalCourses: {
    backgroundColor: "#007aff",
  },
  completedCourses: {
    backgroundColor: "#000",
  },
  ongoingCourses: {
    backgroundColor: "#ff4757",
  },
  totalTrainingTime: {
    backgroundColor: "#7f8cff",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  activeButton: {
    backgroundColor: "#0f4c75",
  },
  activeButtonText:{
    color: '#fff'
  },
  buttonText: {
    color: "#000",
  },
  courseCard: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  courseImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  courseInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuIcon: {
    padding: 10,
  },
  listContentContainer: {
    paddingBottom: 100,
  },
  courseDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  topicItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  topicText: {
    fontSize: 16,
  },
  menuIcon: {
    padding: 10,
  },
});
