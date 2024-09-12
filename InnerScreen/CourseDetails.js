import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // for navigation
import playIcon from '../assets/images/courses/play.png'; // Import play icon
import Card from '../Components/Card';
import localThumbnail from '../assets/images/react native.png'; // Import a local image thumbnail
import { useSelector } from 'react-redux';

const videoData = [
  {
    id: '1',
    title: 'Introduction',
    videos: [
      {
        image: localThumbnail, // Use local image
        name: 'Intro Video',
        description: 'This is the introduction video.',
        videoUrl: 'https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=1', // Add YouTube URL
      },
    ],
  },
  {
    id: '2',
    title: 'React',
    videos: [
      {
        image: localThumbnail, // Use local image
        name: 'React Basics',
        description: 'Introduction to React.',
        videoUrl: 'https://www.youtube.com/watch?v=QFaFIcGhPoM&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=2',
      },
    ],
  },
  // Add other sections...
];

const CourseDetails = () => {
  const [expandedSections, setExpandedSections] = useState([]);
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      {videoData.map((section) => (
        <View key={section.id}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => toggleSection(section.id)}
          >
            <Text style={styles.listItemText}>{section.title}</Text>
            <Icon
              name={expandedSections.includes(section.id) ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {expandedSections.includes(section.id) && (
            <View style={styles.videoList}>
              {section.videos.map((video, index) => (
                <View key={index} style={styles.videoItem}>
                  <TouchableOpacity onPress={() => handlePlayVideo(video.videoUrl)}>
                    <Image source={video.image} style={styles.thumbnail} />
                    <Image source={playIcon} style={styles.playIcon} />
                  </TouchableOpacity>
                  <View style={styles.videoInfo}>
                    <Text style={styles.videoName}>{video.name}</Text>
                    <Text style={styles.videoDescription}>{video.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 15,
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