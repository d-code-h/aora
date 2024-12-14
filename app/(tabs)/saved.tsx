import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';

const Saved = () => {
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
        data={posts.filter((e) => userPrefs?.saved.includes(e.$id))}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No video found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Saved;
