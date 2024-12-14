import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getLatestPost } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { Models } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { user, posts, refetch } = useGlobalContext();

  const {
    data: latestPost,
  }: {
    data: Models.Document[];
  } = useAppwrite(getLatestPost);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary text-white h-full">
      {/* FlatList to display posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-12 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                {/* Welcome text with username */}
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
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
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
