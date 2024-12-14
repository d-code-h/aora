import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { GlobalProvider } from '../context/GlobalProvider';
import '../global.css';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../public/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../public/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../public/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../public/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../public/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../public/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../public/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../public/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../public/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      {/* Stack navigation configuration */}
      <Stack>
        {/* Defining the screen for the main index page, header is hidden */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        {/* Defining the screen for authentication (login/signup), header is hidden */}
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />

        {/* Defining the screen for tabs, header is hidden */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        {/* Defining a dynamic search screen, with a dynamic query parameter */}
        <Stack.Screen
          name="search/[query]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {/* StatusBar component to customize the appearance of the device's status bar */}
      <StatusBar hidden={true} style="auto" />
    </GlobalProvider>
  );
};

export default RootLayout;
