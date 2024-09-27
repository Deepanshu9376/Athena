import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'; // for navigation
import playIcon from '../assets/images/courses/play.png'; // Import play icon
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const CourseDetails = () => {
  const [courseData, setCourseData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [expandedSections, setExpandedSections] = useState([]); // Expanded sections state
  const navigation = useNavigation();
  const route = useRoute();
  const { courseName } = route.params; // Get course name from route

  useEffect(() => {
    // Fetch course details from the API
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch('http://10.50.1.14:4000/courseName', {
          method: 'POST', // Use POST method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseName }), // Send courseName in the body
        });
  
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        setError('Failed to load course details.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseName]);  

  const toggleSection = (id) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(id)
        ? prevSections.filter((sectionId) => sectionId !== id)
        : [...prevSections, id]
    );
  };

  const handlePlayVideo = (videoUrl) => {
    navigation.navigate('VideoPlayerScreen', { videoUrl }); // Navigate to the video player screen
  };

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

  if (!courseData || !courseData.sections) {
    return (
      <View style={styles.center}>
        <Text>No course data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {courseData.sections.map((section) => (
        <View key={section._id}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => toggleSection(section._id)}
          >
            <Text style={styles.listItemText}>{section.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  listItemText: {
    fontSize: 18,
  },
  videoList: {
    paddingVertical: 10,
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    width: 40,
    height: 40,
  },
  videoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  videoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDescription: {
    fontSize: 14,
    color: '#555',
  },
});
