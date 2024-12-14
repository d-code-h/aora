import { View, SafeAreaView, FlatList, Image } from 'react-native';
import React from 'react';
import EmptyState from '@/components/EmptyState'; // Empty state component for no posts
import { getUserPosts, signOut } from '@/lib/appwrite'; // Functions to fetch user posts and sign out
import useAppwrite from '@/lib/useAppwrite'; // Custom hook to fetch data from Appwrite
import VideoCard from '@/components/VideoCard'; // Video card component for displaying individual posts
import { router } from 'expo-router'; // Router for navigation in the app
import { useGlobalContext } from '@/context/GlobalProvider'; // Global context for user state and login status
import { Pressable } from 'react-native'; // Pressable component for handling touchable actions
import { icons } from '@/constants'; // Icons for the app
import InfoBox from '@/components/InfoBox'; // Custom component to display user info (e.g., posts, followers)

const Profile = () => {
  // Destructuring user data and functions to update user state from the global context
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  // Fetching the user's posts using the useAppwrite hook and passing the user's ID
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id as string));

  // Logout function that signs the user out and navigates to the sign-in screen
  const logout = async () => {
    await signOut(); // Signs the user out using Appwrite's sign-out method
    setUser(null); // Resets the user state in the global context
    setIsLoggedIn(false); // Updates the login status to false in the global context

    router.replace('/sign-in'); // Navigates to the sign-in screen
  };

  return (
    <SafeAreaView className="bg-primary text-white h-full">
      {/* FlatList to display the user's posts */}
      <FlatList
        data={posts} // Passing the user's posts as the data source
        keyExtractor={(item) => item.$id} // Using $id as the unique key for each post
        renderItem={({ item }) => <VideoCard video={item} />} // Rendering the VideoCard component for each post
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            {/* Logout button */}
            <Pressable className="w-full items-end mb-10" onPress={logout}>
              <Image
                source={icons.logout} // Logout icon
                resizeMode="contain"
                className="w-6 h-6"
              />
            </Pressable>
            {/* User avatar */}
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }} // Displaying the user's avatar from the user object
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            {/* Displaying user's username */}
            <InfoBox
              title={user?.username} // User's username
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            {/* Displaying user stats (posts and followers) */}
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0} // Number of posts (or 0 if no posts exist)
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k" // Placeholder for follower count
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        // Component displayed when there are no posts
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found" // Title for empty state
            subtitle="No video found for this search query" // Subtitle for empty state
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
