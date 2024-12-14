import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <>
      {/* Stack navigation setup */}
      <Stack>
        {/* Screen for the sign-in page */}
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />

        {/* Screen for the sign-up page */}
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
