import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, Divider } from 'react-native-paper';
import reactnative from '../assets/images/react native.png';
import ai from '../assets/images/ai.jpg'

const coursesData = {
  ongoing: [
    { id: '1', title: 'Zero to Hero: React native', description: 'Description for Course 1' },
    { id: '2', title: 'NLP and AI Generative', description: 'Description for Course 2' },
  ],
  completed: [
    { id: '3', title: 'Course 3', description: 'Description for Course 3' },
    { id: '4', title: 'Course 4', description: 'Description for Course 4' },
  ],
  expired: [
    { id: '5', title: 'Course 5', description: 'Description for Course 5' },
    { id: '6', title: 'Course 6', description: 'Description for Course 6' },
  ],
};

const Home = () => {
  const [selectedType, setSelectedType] = useState('ongoing');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={reactnative} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => openMenu(item)}>
          <Icon name="ellipsis-vertical" size={20} color="#000" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <Menu
        visible={menuVisible && selectedCourse?.id === item.id}
        onDismiss={closeMenu}
        anchor={<View />}
      >
        <Menu.Item onPress={() => {}} title="Course Summary" />
      </Menu>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={[styles.card, styles.totalCourses]}>
        <Text style={styles.cardTitle}>Total Courses</Text>
        <Text style={styles.cardNumber}>21</Text>
        <Icon name="list-outline" size={30} color="#fff" style={styles.icon} />
      </View>
      <View style={[styles.card, styles.completedCourses]}>
        <Text style={styles.cardTitle}>Completed Courses</Text>
        <Text style={styles.cardNumber}>17</Text>
        <Icon name="checkmark-circle-outline" size={30} color="#fff" style={styles.icon} />
      </View>
      <View style={[styles.card, styles.ongoingCourses]}>
        <Text style={styles.cardTitle}>Ongoing Courses</Text>
        <Text style={styles.cardNumber}>1</Text>
        <Icon name="play-circle-outline" size={30} color="#fff" style={styles.icon} />
      </View>
      <View style={[styles.card, styles.totalTrainingTime]}>
        <Text style={styles.cardTitle}>Total Training Time</Text>
        <Text style={styles.cardNumber}>88h 00m</Text>
        <Icon name="time-outline" size={30} color="#fff" style={styles.icon} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedType === 'ongoing' && styles.activeButton]}
          onPress={() => handleButtonPress('ongoing')}
        >
          <Text style={styles.buttonText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedType === 'completed' && styles.activeButton]}
          onPress={() => handleButtonPress('completed')}
        >
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedType === 'expired' && styles.activeButton]}
          onPress={() => handleButtonPress('expired')}
        >
          <Text style={styles.buttonText}>Expired</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={coursesData[selectedType]}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Add padding to prevent overlap with the bottom navigation bar
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  totalCourses: {
    backgroundColor: '#007aff',
  },
  completedCourses: {
    backgroundColor: '#4cd137',
  },
  ongoingCourses: {
    backgroundColor: '#ff4757',
  },
  totalTrainingTime: {
    backgroundColor: '#7f8cff',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#0f4c75',
  },
  buttonText: {
    color: '#fff',
  },
  courseCard: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 5,
  },
});
