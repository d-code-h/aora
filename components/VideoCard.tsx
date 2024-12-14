import { icons } from '@/constants';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import { VideoCardType } from '@/lib/types';
import clsx from 'clsx';
import { useGlobalContext } from '@/context/GlobalProvider';
import { deletePost, saveFavorite } from '@/lib/appwrite';
import { useEvent } from 'expo';
import { StyleSheet } from 'react-native';

const VideoCard: FC<VideoCardType> = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar, accountId },
  },
}) => {
  const [more, setMore] = useState(false);
  const { user, userPrefs, setUserPrefs } = useGlobalContext();

  const handleFavorite = async (id: string) => {
    const res = await saveFavorite(id);
    setUserPrefs(res);
    setMore(false);
  };

  const player = useVideoPlayer(video);

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  return (
    <View className="flex-col items-center mx-4 mb-14">
      {/* Container for the entire card */}
      <View className="flex-row gap-3 items-start">
        {/* Header section with creator's avatar and video title */}
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title} {/* Display video title */}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username} {/* Display creator's username */}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Pressable onPress={() => setMore((prev) => !prev)}>
            {/* Toggle the "more options" menu */}
            <Image
              source={icons.menu}
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
          more ? 'flex' : 'hidden'
        )}
      >
        <Pressable onPress={() => handleFavorite($id)}>
          <View className="py-2 px-4 flex flex-row items-center gap-1">
            <Image
              source={icons.bookmark}
              className="w-3 h-3"
              resizeMode="contain"
            />
            <Text className="bg-black-100 text-gray-100">
              {userPrefs?.saved.includes($id) ? 'Unsave' : 'Save'}
              {/* Toggle between save/unsave based on current state */}
            </Text>
          </View>
        </Pressable>
        {/* Show delete option only if the user is the post creator */}
        {user?.accountId === accountId && (
          <Pressable onPress={() => deletePost($id)}>
            {/* Delete the post */}
            <View className="py-2 px-4 flex flex-row items-center gap-1">
              <Image
                source={icons.trash}
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
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <Pressable
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center active:opacity-50"
          onPress={() => (isPlaying ? player.pause() : player.replay())}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-sm mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 240,
    marginTop: 12,
    borderRadius: 12,
  },
});

export default VideoCard;
