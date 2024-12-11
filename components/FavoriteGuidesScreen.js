import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { supabase } from '../supabase';

const FavoriteGuidesScreen = ({ route }) => {
  const navigation = useNavigation();

  const [favoritedGuides, setFavoritedGuides] = useState([]);

  useEffect(() => {
    const fetchFavoritedGuides = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      try {
        const { data: favoritedData, error: guidesError } = await supabase
          .from('favorite guides')
          .select('guide_id')
          .eq('user_id', user.id);
    
        if (guidesError) {
          throw guidesError;
        }
    
        const favoritedGuideIds = favoritedData.map((fav) => fav.guide_id);
    
        // Fetch the guide titles based on the favorited guide ids
        const { data: guidesData, error: guidesFetchError } = await supabase
          .from('guides')
          .select('title')
          .in('id', favoritedGuideIds);
    
        if (guidesFetchError) {
          throw guidesFetchError;
        }
    
        // Set the fetched guide titles
        setFavoritedGuides(guidesData.map((guide) => guide.title));
      } catch (error) {
        console.error('Error fetching favorited guides:', error.message);
      }
    };
    

    fetchFavoritedGuides();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Favorited Guides</Text>
      </View>

      {favoritedGuides.length === 0 ? (
        <Text style={styles.emptyText}>
          You haven't favorited any guides, go check them out!
        </Text>
      ) : (
        <FlatList
          data={favoritedGuides}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.guideItem}>
              <Text style={styles.guideName}>{item}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  guideName: {
    fontSize: 16,
    flex: 1,
  },
});

export default FavoriteGuidesScreen;
