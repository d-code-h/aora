import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants'; // Import images (likely from assets or constants)
import SearchInput from '@/components/SearchInput'; // Custom search input component
import Trending from '@/components/Trending'; // Trending videos component
import EmptyState from '@/components/EmptyState'; // Component for empty state when no posts
import { getLatestPost } from '@/lib/appwrite'; // Function to fetch the latest posts
import useAppwrite from '@/lib/useAppwrite'; // Custom hook to handle appwrite interactions
import VideoCard from '@/components/VideoCard'; // Component to display individual video posts
import { Models } from 'react-native-appwrite'; // Appwrite models for type definition
import { useGlobalContext } from '@/context/GlobalProvider'; // Global context for state management

const Home = () => {
  // Setting up state for refreshing the FlatList
  const [refreshing, setRefreshing] = useState(false);
  // Destructuring context values: user, posts, and refetch function from global context
  const { user, posts, refetch } = useGlobalContext();

  // Fetching latest posts using custom hook that calls getLatestPost function
  const {
    data: latestPost,
  }: {
    data: Models.Document[]; // The type for latestPost is an array of documents from Appwrite
  } = useAppwrite(getLatestPost);

  // Function to handle refreshing of data (refetching the posts)
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    await refetch(); // Refetch posts data
    setRefreshing(false); // Set refreshing state to false after refetch is complete
  };

  return (
    <SafeAreaView className="bg-primary text-white h-full">
      {/* FlatList to display posts */}
      <FlatList
        data={posts} // The posts array as the data source
        keyExtractor={(item) => item.$id} // Using $id as the unique key for each post
        renderItem={({ item }) => <VideoCard video={item} />} // Rendering VideoCard component for each post
        ListHeaderComponent={() => (
          // Rendering a header for the list (this will be shown at the top of the list)
          <View className="my-12 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                {/* Welcome text with username */}
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}{' '}
                  {/* Display the username of the logged-in user */}
                </Text>
              </View>
              <View className="mt-1.5">
                {/* Logo image */}
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            {/* Search bar to search for video topics */}
            <SearchInput placeholder="Search for a video topic" />

            {/* Section for displaying trending videos */}
            <View className="w-full flex-1 mt-5 mb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              {/* Displaying trending posts */}
              <Trending posts={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          // Component displayed when the list is empty (i.e., no posts found)
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video" // Encouragement message to upload videos
          />
        )}
        // Adding pull-to-refresh functionality with the RefreshControl
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
