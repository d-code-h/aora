import { View, Text, SafeAreaView, FlatList } from 'react-native'; // Importing necessary components from react-native
import React, { useEffect } from 'react'; // Importing React and useEffect for side effects
import SearchInput from '@/components/SearchInput'; // Importing the custom SearchInput component
import EmptyState from '@/components/EmptyState'; // Importing the EmptyState component for when no results are found
import { searchPosts } from '@/lib/appwrite'; // Importing the searchPosts function from appwrite library to search posts
import useAppwrite from '@/lib/useAppwrite'; // Importing custom hook for interacting with Appwrite API
import VideoCard from '@/components/VideoCard'; // Importing the VideoCard component to render individual video posts
import { useLocalSearchParams } from 'expo-router'; // Importing hook to access local search parameters (e.g., query)

const Search = () => {
  // Extracting the search query from the URL parameters using useLocalSearchParams hook
  const { query }: { query: string } = useLocalSearchParams();

  // Fetching posts based on the search query using the custom useAppwrite hook, which internally calls the searchPosts function
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  // Using useEffect to refetch the posts when the query changes
  useEffect(() => {
    refetch(); // Re-fetch posts whenever the search query changes
  }, [query]);

  return (
    // SafeAreaView ensures the content is within the safe boundaries of a device screen
    <SafeAreaView className="bg-primary text-white h-full">
      {/* FlatList component for rendering a list of video posts */}
      <FlatList
        data={posts} // The data to be rendered (fetched posts)
        keyExtractor={(item) => item.$id} // Each item's unique identifier
        renderItem={({ item }) => <VideoCard video={item} />} // Rendering each post using the VideoCard component
        ListHeaderComponent={() => (
          // Header of the list showing the search query and search input field
          <View className="my-6 px-4">
            {/* Displaying the title for search results */}
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            {/* Displaying the current search query */}
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            {/* Rendering the SearchInput component */}
            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={query} // Setting the initial query in the input field
                placeholder="Search for a video topic" // Placeholder text for the search input
              />
            </View>
          </View>
        )}
        // Empty state when no posts are found
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found" // Title for the empty state
            subtitle="No video found for this search query" // Subtitle explaining no results were found
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
