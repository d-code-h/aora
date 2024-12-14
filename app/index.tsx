import CustomButtom from '@/components/CustomButton'; // Importing the CustomButton component
import { images } from '@/constants'; // Importing images used in the component from constants
import { useGlobalContext } from '@/context/GlobalProvider'; // Importing the global context to access app-wide states
import { Redirect, router } from 'expo-router'; // Importing router utilities for navigation and Redirect component
import { StatusBar } from 'expo-status-bar'; // Importing StatusBar to control the appearance of the status bar
import { Image, ScrollView, Text, View } from 'react-native'; // Importing React Native components for layout and text
import { SafeAreaView } from 'react-native-safe-area-context'; // Importing SafeAreaView to ensure UI stays within the safe area of the screen

// Main component function
export default function Index() {
  // Accessing global context for loading and login state
  const { isLoading, isLoggedIn } = useGlobalContext();

  // Redirecting to the home screen if the user is logged in and not loading
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      {' '}
      // SafeAreaView ensures content stays within safe areas of the device
      screen
      <ScrollView
        contentContainerStyle={{
          height: '100%', // Ensures the content fills the screen height
        }}
      >
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          {' '}
          // Centering content and providing padding
          {/* Displaying the logo image */}
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]" // Logo size
            resizeMode="contain" // Ensures the logo fits within the specified dimensions without distortion
          />
          {/* Displaying a promotional image */}
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]" // Image size and width
            resizeMode="contain" // Ensures the image fits without distortion
          />
          {/* Section containing a title */}
          <View className="relative mt-5">
            {' '}
            // Adding some margin on top for spacing
            <Text className="text-3xl text-white font-bold text-center">
              {' '}
              // Title styling (large, white, bold text) Discover Endless
              Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text> // Highlighting
              part of the title with a different color
            </Text>
            {/* Decorative path image */}
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8" // Positioning the path image at the bottom right
              resizeMode="contain"
            />
          </View>
          {/* Subtitle text under the main title */}
          <Text className="text-sm text-gray-100 mt-7 text-center">
            {' '}
            // Smaller text size, gray color, and centered Where creativity
            meets innovation: embark on a journey of limitless exploration with
            Aora
          </Text>
          {/* Button to continue with email */}
          <CustomButtom
            title="Continue with Email" // Button text
            handlePress={() => router.push('/sign-in')} // Redirect to sign-in page on press
            containerStyles="w-full mt-7" // Button width and margin on top
          />
        </View>
      </ScrollView>
      {/* Hidden status bar for a clean look */}
      <StatusBar hidden={true} backgroundColor="#161622" />
    </SafeAreaView>
  );
}
