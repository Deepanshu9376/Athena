import React , {useState,useEffect, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../Context/authContext';
import {BASE_URL} from '@env';

const Profile = () => {
  const {user}=useContext(UserContext)
  const [userData, setUserData] = useState({ username: '' });
  const [error, setError] = useState(null);

  // Fetch username from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Attempting to fetch user data...');
        const response = await fetch(`${BASE_URL}:4000/get-username`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched user data:', result);

        setUserData({ username: result.username });
      } catch (error) {
        setError(error.message);
        // console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, styles.profileCard]}>
        <View style={styles.profileInfo}>
          <Avatar.Text size={60} label={userData.username ? userData.username[0] : "DT"} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text style={styles.cardTitle}>{userData.username || 'Loading...'}</Text>
            <Text style={styles.cardEmail}>{user.email}</Text>
            <Text style={styles.cardContact}>+91 12345 67890</Text>
          </View>
        </View>
      </Card>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Basic Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date of Joining:</Text>
          <Text style={styles.detailValue}>15 Jan 2024</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>Training</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>Canan Tower, Gurugram</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>EC Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>EC:</Text>
          <Text style={styles.detailValue}>Full stack (Angular/ Node/ React)</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>EC Mentor:</Text>
          <Text style={styles.detailValue}>divya.sharma@geminisolutions.com</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>DC Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>DC:</Text>
          <Text style={styles.detailValue}>Internal MIS</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>DC Mentor:</Text>
          <Text style={styles.detailValue}>deepak.sukhija@geminisolutions.com</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Test Details </Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Tests Given:</Text>
          <Text style={styles.detailValue}>20</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profileCard: {
    backgroundColor: '#0f4c75',
    padding: 20,
    borderRadius: 10,
    fontSize: 12,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
  },
  avatar: {
    backgroundColor: '#94ecff',
  },
  profileText: {
    marginLeft: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardEmail: {
    color: '#fff',
    fontSize: 16,
  },
  cardContact: {
    color: '#fff',
    fontSize: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    flexWrap: 'wrap',
    flexDirection:'row'
  },
});

export default Profile;