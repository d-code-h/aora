import { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { icons } from '../../constants';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { useGlobalContext } from '../../context/GlobalProvider';
import { createVideoPost } from '@/lib/appwrite';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Form } from '@/lib/types';

// Component to handle video creation
const Create = () => {
  const { user } = useGlobalContext(); // Global context to get user information
  const [uploading, setUploading] = useState(false); // State to track if the video is uploading
  const [form, setForm] = useState<Form>({
    title: '', // Title of the video
    video: null, // Video file
    thumbnail: null, // Thumbnail file
    prompt: '', // AI prompt for the video
  });

  // Initialize the video player for video preview
  const player = useVideoPlayer(form.video?.uri as string);

  // Function to open the image or video picker
  const openPicker = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If a selection was made, update form based on selectType (image or video)
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0], // Set the thumbnail image
        });
      }
      if (selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0], // Set the video file
        });
      }
    }
  };

  // Submit function to handle the form submission and video post creation
  const submit = async () => {
    // Check if all required fields are filled
    if (
      form.prompt === '' ||
      form.title === '' ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true); // Set uploading state to true

    try {
      // Call API to create the video post
      await createVideoPost({
        ...form,
        userId: user?.$id, // Pass user ID along with form data
      });

      // Show success message
      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home'); // Navigate to home page after successful upload
    } catch (error: any) {
      // Show error message if the upload fails
      Alert.alert('Error', error.message);
    } finally {
      // Reset form and uploading state
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        {/* Title Section */}
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        {/* Form field for the video title */}
        <FormField
          title="Video Title"
          value={form.title as string}
          placeholder="Give your video a catchy title..."
          handleChange={(e) => setForm({ ...form, title: e.nativeEvent.text })}
          otherStyles="mt-10"
        />

        {/* Video upload section */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <Pressable onPress={() => openPicker('video')}>
            {/* If video is selected, show video preview, otherwise show upload placeholder */}
            {form.video ? (
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </Pressable>
        </View>

        {/* Thumbnail upload section */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <Pressable onPress={() => openPicker('image')}>
            {/* If thumbnail is selected, show image preview, otherwise show upload placeholder */}
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* AI prompt input field */}
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChange={(e: any) =>
            setForm({ ...form, prompt: e.nativeEvent.text })
          }
          otherStyles="mt-7"
        />

        {/* Submit button */}
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading} // Show loading spinner while uploading
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for video preview
const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
});

export default Create;
