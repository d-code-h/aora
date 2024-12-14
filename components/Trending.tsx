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
// TypeScript interface for the TrendingItem component props
import { TrendingItemProps } from '@/lib/types';
import { useEvent } from 'expo';

// Animation definitions
const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1.1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const player = useVideoPlayer(item.video);

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <Pressable
          className="relative justify-center items-center active:opacity-50"
          // activeOpacity={0.7}
          onPress={() => (isPlaying ? player.pause() : player.replay())}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);

  const viewableItemsChange = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: 208,
    height: 288,
    marginTop: 12,
    borderRadius: 35,
    backgroundColor: 'rgb(255 255 255 / 0.1)',
  },
});

export default Trending;
