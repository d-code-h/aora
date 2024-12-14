import { View, Text, Image } from 'react-native'; // Importing basic components from React Native
import React, { FC } from 'react'; // Importing React and FC (Functional Component) type for type safety
import { images } from '@/constants'; // Importing the images object containing static image assets (e.g., empty state image)
import CustomButtom from './CustomButton'; // Importing the CustomButton component used in the empty state screen
import { router } from 'expo-router'; // Importing the router to handle navigation
import { EmptyStateType } from '@/lib/types'; // Importing the type for the component props

// EmptyState component that displays an empty state view with an image, title, subtitle, and a button
const EmptyState: FC<EmptyStateType> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      {' '}
      {/* Container with center alignment and padding */}
      {/* Displaying the empty state image */}
      <Image
        source={images.empty} // Image source (empty state image)
        className="w-[270px] h-[215px]" // Styling the image with specific width and height
        resizeMode="contain" // Ensuring the image fits within its container while maintaining its aspect ratio
      />
      {/* Title text */}
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title} {/* Display the title passed as a prop */}
      </Text>
      {/* Subtitle text */}
      <Text className="font-pmedium text-sm text-gray-100">
        {subtitle} {/* Display the subtitle passed as a prop */}
      </Text>
      {/* Custom button component for creating a video */}
      <CustomButtom
        title="Create video" // Button label
        handlePress={() => router.push('/create')} // On press, navigate to the '/create' route
        containerStyles="w-full my-5" // Styling for the button container (full width and vertical margin)
      />
    </View>
  );
};

export default EmptyState;
