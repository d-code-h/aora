import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { GlobalProvider } from '../context/GlobalProvider';
import '../global.css';

import { useFonts } from 'expo-font';
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../public/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../public/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../public/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../public/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../public/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../public/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../public/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../public/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../public/assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="search/[query]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
