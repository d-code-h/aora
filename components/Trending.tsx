import { icons } from '@/constants';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';

import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ImageBackground,
  Image,
  ViewToken,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TrendingProps } from '@/lib/types';
import { TrendingItemProps } from '@/lib/types';
import { useEvent } from 'expo';

// Animation definitions for zooming in and out effects on the video card
const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }], // initial scale for zoom in
  },
  1: {
    transform: [{ scale: 1.1 }], // final scale for zoom in
  },
};

const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1.1 }], // initial scale for zoom out
  },
  1: {
    transform: [{ scale: 0.9 }], // final scale for zoom out
  },
};

// TrendingItem component to display individual items in the trending section
const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  // Set up video player for the item
  const player = useVideoPlayer(item.video);

  // Track if the video is playing
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      className="mr-5" // Styling for the item wrapper
      animation={activeItem === item.$id ? zoomIn : zoomOut} // Apply zoomIn or zoomOut animation based on active item
      duration={500} // Animation duration in milliseconds
    >
      {isPlaying ? (
        // Show video player when video is playing
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        // Show thumbnail image and play button when video is paused
        <Pressable
          className="relative justify-center items-center active:opacity-50" // Styling for pressable area
          // activeOpacity={0.7} // Optional opacity change on press
          onPress={() => (isPlaying ? player.pause() : player.replay())} // Toggle between play and pause
        >
          <ImageBackground
            source={{ uri: item.thumbnail }} // Background image for the item
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40" // Styling for the thumbnail
            resizeMode="cover" // Resize mode for image
          />
          <Image
            source={icons.play} // Play icon to overlay on thumbnail
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </Animatable.View>
  );
};

// Trending component to display the list of trending items
const Trending: React.FC<TrendingProps> = ({ posts }) => {
  // Track the currently active (viewed) item
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);

  // Handle when viewable items change (for horizontal scrolling)
  const viewableItemsChange = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      // Set the active item to the first visible item
      setActiveItem(viewableItems[0].item.$id);
    }
  };

  return (
    <FlatList
      data={posts} // Data for the trending items
      keyExtractor={(item) => item.$id} // Key extractor for each item
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} /> // Render each item using TrendingItem component
      )}
      horizontal // Make the FlatList horizontal (side-scrolling)
      onViewableItemsChanged={viewableItemsChange} // Handler for viewable items change
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70, // The item should be at least 70% visible to be considered viewable
      }}
      contentOffset={{ x: 170, y: 0 }} // Initial offset for the list
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: 208,
    height: 288,
    marginTop: 12,
    borderRadius: 35,
    backgroundColor: 'rgb(255 255 255 / 0.1)', // Transparent background with a slight white tint
  },
});

export default Trending;
