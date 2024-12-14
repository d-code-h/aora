import { icons } from '@/constants'; // Import icons for UI elements
import { useVideoPlayer, VideoView } from 'expo-video'; // Import Expo Video functionality for video player
import { FC, useState } from 'react'; // Import necessary React functionality (FC for functional components and useState for state)
import { View, Text, Image, Pressable } from 'react-native'; // Import components from React Native for layout

import { VideoCardType } from '@/lib/types'; // Import custom types for video card data
import clsx from 'clsx'; // Utility for conditionally applying classes
import { useGlobalContext } from '@/context/GlobalProvider'; // Import global context to access user preferences
import { deletePost, saveFavorite } from '@/lib/appwrite'; // Import functions to interact with Appwrite API (for saving favorites and deleting posts)
import { useEvent } from 'expo'; // Import Expo hook to listen to events in the video player
import { StyleSheet } from 'react-native'; // Import StyleSheet for styling components

// Functional component for rendering video card
const VideoCard: FC<VideoCardType> = ({
  video: {
    $id, // Video ID
    title, // Video title
    thumbnail, // Video thumbnail image URL
    video, // Video file URL
    creator: { username, avatar, accountId }, // Video creator details (username, avatar, account ID)
  },
}) => {
  const [more, setMore] = useState(false); // State to toggle visibility of additional options menu
  const { user, userPrefs, setUserPrefs } = useGlobalContext(); // Access global context for user info and preferences

  // Handle saving/removing a video from favorites
  const handleFavorite = async (id: string) => {
    const res = await saveFavorite(id); // Save or remove the video from favorites
    setUserPrefs(res); // Update user preferences with the response from saving
    setMore(false); // Close the options menu
  };

  // Initialize the video player with the provided video URL
  const player = useVideoPlayer(video);

  // Listen to the video player's playing status using Expo's useEvent hook
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing, // Update isPlaying status
  });

  return (
    <View className="flex-col items-center mx-4 mb-14">
      {' '}
      {/* Container for the entire card */}
      <View className="flex-row gap-3 items-start">
        {' '}
        {/* Header section with creator's avatar and video title */}
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }} // Display creator's avatar image
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1} // Truncate title if it's too long
            >
              {title} {/* Display video title */}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1} // Truncate username if it's too long
            >
              {username} {/* Display creator's username */}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Pressable onPress={() => setMore((prev) => !prev)}>
            {' '}
            {/* Toggle the "more options" menu */}
            <Image
              source={icons.menu} // Menu icon
              className="w-5 h-5"
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
      {/* "More options" menu for saving and deleting posts */}
      <View
        className={clsx(
          'border border-black-100 rounded-md gap-1 ml-auto w-[111px] bg-black-100 absolute right-0 top-10 z-10',
          more ? 'flex' : 'hidden' // Toggle visibility based on the 'more' state
        )}
      >
        <Pressable onPress={() => handleFavorite($id)}>
          <View className="py-2 px-4 flex flex-row items-center gap-1">
            <Image
              source={icons.bookmark} // Bookmark icon for saving to favorites
              className="w-3 h-3"
              resizeMode="contain"
            />
            <Text className="bg-black-100 text-gray-100">
              {userPrefs?.saved.includes($id) ? 'Unsave' : 'Save'}{' '}
              {/* Toggle between save/unsave based on current state */}
            </Text>
          </View>
        </Pressable>
        {/* Show delete option only if the user is the post creator */}
        {user?.accountId === accountId && (
          <Pressable onPress={() => deletePost($id)}>
            {' '}
            {/* Delete the post */}
            <View className="py-2 px-4 flex flex-row items-center gap-1">
              <Image
                source={icons.trash} // Trash icon for deleting the post
                className="w-3 h-3"
                resizeMode="contain"
              />
              <Text className="bg-black-100 text-gray-100">Delete</Text>
            </View>
          </Pressable>
        )}
      </View>
      {/* Video display section */}
      {isPlaying ? (
        // Video player view when the video is playing
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        // Display thumbnail when video is not playing, with play button overlay
        <Pressable
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center active:opacity-50"
          onPress={() => (isPlaying ? player.pause() : player.replay())} // Toggle play/pause or replay the video
        >
          <Image
            source={{ uri: thumbnail }} // Display video thumbnail
            className="w-full h-full rounded-sm mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play} // Play icon overlay
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

// Styling for the video player component
const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 240,
    marginTop: 12,
    borderRadius: 12, // Rounded corners for the video player
  },
});

export default VideoCard; // Export the VideoCard component
