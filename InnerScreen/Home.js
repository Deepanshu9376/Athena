import React, {useState} from "react";
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu , Provider} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 

const Home = ({ enrolledCourses }) => {
  const [selectedType, setSelectedType] = useState('ongoing');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const navigation = useNavigation();

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
    navigation.navigate('CourseDetail');
  };

  return (
    <Provider>
      <View style={styles.container}>
        {enrolledCourses.length > 0 ? (
          <FlatList
            data={enrolledCourses}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCoursePress(item)}>
                <View style={styles.courseCard}>
                  <Image source={item.image} style={styles.courseImage} />
                  <View style={styles.courseInfo}>
                    <View>
                      <Text style={styles.courseTitle}>{item.name}</Text>
                      <Text style={styles.courseDuration}>{item.duration}</Text>
                    </View>
                    <TouchableOpacity onPress={() => openMenu(item)}>
                      <Icon name="ellipsis-vertical" size={24} color="#000" style={styles.menuIcon} />
                    </TouchableOpacity>
                  </View>
                  <Menu
                    visible={menuVisible && selectedCourse?.id === item.id}
                    onDismiss={closeMenu}
                    anchor={<View />} // Anchor ensures the menu opens when the icon is clicked
                    onPress={()=>console.log("menu clicked")}
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
                      icon={() => <Icon name="document-text" size={20} color="#000" />}
                      onPress={() => {
                        console.log("Course Summary pressed for", item.name);
                        closeMenu();
                      }}
                      title="Course Summary"
                    />
                  </Menu>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>No courses enrolled yet.</Text>
        )}
      </View>
    </Provider>
  );
};


export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: "#4cd137",
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
    fontSize: 24,
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
  buttonText: {
    color: "#fff",
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
