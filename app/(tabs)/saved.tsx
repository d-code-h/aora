import { View, Text, SafeAreaView, FlatList } from 'react-native'; // Importing necessary components from React Native
import { useGlobalContext } from '@/context/GlobalProvider'; // Custom hook to access global context (posts and user preferences)
import VideoCard from '@/components/VideoCard'; // Component to display individual video posts
import EmptyState from '@/components/EmptyState'; // Empty state component for when no saved videos are found
import SearchInput from '@/components/SearchInput'; // Search input component for filtering videos by topic

const Saved = () => {
  // Destructuring posts and userPrefs from the global context
  const { posts, userPrefs } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary text-white h-full">
      <View className="my-12 px-4 space-y-6">
        {/* Title Section */}
        <Text className="text-2xl my-7 text-white font-psemibold">
          Saved Video
        </Text>

        {/* Search Input */}
        <SearchInput placeholder="Search for a video topic" />
      </View>

      {/* FlatList to display saved videos */}
      <FlatList
        // Filtering posts to show only those that are saved by the user
        data={posts.filter((e) => userPrefs?.saved.includes(e.$id))}
        keyExtractor={(item) => item.$id} // Using $id as the unique key for each post
        renderItem={({ item }) => <VideoCard video={item} />} // Rendering VideoCard component for each saved post
        // Empty State when no saved videos are found
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found" // Title for the empty state
            subtitle="No video found for this search query" // Subtitle for the empty state
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Saved;
