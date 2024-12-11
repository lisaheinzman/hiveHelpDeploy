import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RecentGuidesData = [
];

const RecentGuidesScreen = () => {
  const navigation = useNavigation();
  const [recentlySeenGuides, setRecentlySeenGuides] = useState(RecentGuidesData);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Recently Viewed Guides</Text>
      </View>

      {recentlySeenGuides.length === 0 ? (
        <Text style={styles.emptyText}>
          You haven't recently viewed any guides, go check them out!
        </Text>
      ) : (
        <FlatList
          data={RecentGuidesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.guideItem}>
              <Text style={styles.guideName}>{item.title}</Text>
              {/* Add more guide details or actions as needed */}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 20,
    paddingTop: 30,
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },
  guideItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align guide names to the left
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  guideName: {
    fontSize: 16,
    marginLeft: 8, // Add margin for better spacing
  },
});

export default RecentGuidesScreen;
