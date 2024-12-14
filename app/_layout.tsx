import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router'; // Importing SplashScreen for splash screen management and Stack for navigation
import { GlobalProvider } from '../context/GlobalProvider'; // Importing the GlobalProvider to manage global app state
import '../global.css'; // Importing global CSS styles

import { useFonts } from 'expo-font'; // Importing useFonts hook to load custom fonts

// Preventing the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// RootLayout component
const RootLayout = () => {
  // Loading custom fonts using the useFonts hook
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../public/assets/fonts/Poppins-Black.ttf'), // Custom font for bold text
    'Poppins-Bold': require('../public/assets/fonts/Poppins-Bold.ttf'), // Custom font for semi-bold text
    'Poppins-ExtraBold': require('../public/assets/fonts/Poppins-ExtraBold.ttf'), // Extra bold font
    'Poppins-ExtraLight': require('../public/assets/fonts/Poppins-ExtraLight.ttf'), // Extra light font
    'Poppins-Light': require('../public/assets/fonts/Poppins-Light.ttf'), // Light font
    'Poppins-Medium': require('../public/assets/fonts/Poppins-Medium.ttf'), // Medium font weight
    'Poppins-Regular': require('../public/assets/fonts/Poppins-Regular.ttf'), // Regular font weight
    'Poppins-SemiBold': require('../public/assets/fonts/Poppins-SemiBold.ttf'), // Semi-bold font
    'Poppins-Thin': require('../public/assets/fonts/Poppins-Thin.ttf'), // Thin font
  });

  // useEffect hook to manage the splash screen and handle font loading errors
  useEffect(() => {
    if (error) throw error; // Throw an error if there's an issue with loading fonts

    if (fontsLoaded) SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
  }, [fontsLoaded, error]);

  // If fonts aren't loaded yet or there's an error, render nothing
  if (!fontsLoaded && !error) return null;

  return (
    // Wrapping the application in the GlobalProvider to provide global state
    <GlobalProvider>
      {/* Stack navigation configuration */}
      <Stack>
        {/* Defining the screen for the main index page, header is hidden */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Hides the header for this screen
          }}
        />

        {/* Defining the screen for authentication (login/signup), header is hidden */}
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false, // Hides the header for this screen
          }}
        />

        {/* Defining the screen for tabs, header is hidden */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // Hides the header for this screen
          }}
        />

        {/* Defining a dynamic search screen, with a dynamic query parameter */}
        <Stack.Screen
          name="search/[query]"
          options={{
            headerShown: false, // Hides the header for this screen
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
