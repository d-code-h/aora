import React from 'react'; // Importing React library
import { Stack } from 'expo-router'; // Importing Stack for navigation between screens using expo-router
import { StatusBar } from 'expo-status-bar'; // Importing StatusBar to manage the appearance of the device status bar

const AuthLayout = () => {
  return (
    <>
      {/* Stack navigation setup */}
      <Stack>
        {/* Screen for the sign-in page */}
        <Stack.Screen
          name="sign-in" // The name of the screen route
          options={{
            headerShown: false, // Hides the default header for this screen
          }}
        />

        {/* Screen for the sign-up page */}
        <Stack.Screen
          name="sign-up" // The name of the screen route
          options={{
            headerShown: false, // Hides the default header for this screen
          }}
        />
      </Stack>

      {/* StatusBar component to customize the appearance of the device's status bar */}
      <StatusBar
        hidden={true} // Hides the status bar
        // backgroundColor="#161622" // Optional: You can uncomment this line to customize the background color of the status bar
        style="auto" // Automatically adjusts the style of the status bar based on the app's theme
      />
    </>
  );
};

export default AuthLayout;
