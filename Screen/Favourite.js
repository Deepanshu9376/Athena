import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Favourite = ({ route }) => {
  const { wishlist } = route.params; 
  return (
    <View style={styles.container}>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <Text style={styles.courseText}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No favourite courses added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  courseItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },
  courseText: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default Favourite;
