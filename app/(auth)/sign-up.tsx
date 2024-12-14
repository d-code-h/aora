import { View, Text, ScrollView, Image, Alert } from 'react-native'; // Importing necessary components from React Native
import React, { useState } from 'react'; // Importing React and useState hook
import { SafeAreaView } from 'react-native-safe-area-context'; // Importing SafeAreaView to ensure the content is displayed within the screen's safe area
import { images } from '@/constants'; // Importing images from constants
import FormField from '@/components/FormField'; // Importing the FormField component to create input fields
import CustomButtom from '@/components/CustomButton'; // Importing CustomButtom component for the submit button
import { Link, router } from 'expo-router'; // Importing Link and router from expo-router for navigation
import { createUser } from '@/lib/appwrite'; // Importing the function to create a new user using Appwrite
import { useGlobalContext } from '@/context/GlobalProvider'; // Importing the global context to manage user and login state

import { AuthState } from '@/lib/types'; // Importing types for authentication state

const SignUp = () => {
  // Setting up state to hold form values (username, email, password)
  const [form, setForm] = useState<AuthState>({
    username: '',
    email: '',
    password: '',
  });

  // State to manage form submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extracting functions from the global context to update user data and login state
  const { setUser, setIsLoggedIn } = useGlobalContext();

  // Function to handle form submission
  const submit = async () => {
    // Basic validation to ensure all fields are filled
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields'); // Show error alert if any field is empty
    }

    setIsSubmitting(true); // Set the submitting state to true

    try {
      // Attempt to create a new user with the provided email, password, and username
      const result = await createUser(
        form.email,
        form.password,
        form.username as string
      );

      // Update user state with the newly created user data
      setUser(result);
      setIsLoggedIn(true); // Set the logged-in state to true

      // Navigate to the home page upon successful sign-up
      router.replace('/home');
    } catch (error: any) {
      // Log and show an error message if sign-up fails
      Alert.alert('Error', error.message);
    } finally {
      // Set the submitting state to false after the request is completed (either success or failure)
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* Scrollable view for the sign-up form */}
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 py-6">
          {/* Displaying logo */}
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          {/* Title of the sign-up screen */}
          <Text className="text-2xl text-white mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          {/* FormField component for username input */}
          <FormField
            title="Username"
            value={form.username as string}
            handleChange={
              (e) => setForm({ ...form, username: e.nativeEvent.text }) // Updating the username field value
            }
            otherStyles="mt-10"
          />

          {/* FormField component for email input */}
          <FormField
            title="Email"
            value={form.email}
            handleChange={
              (e) => setForm({ ...form, email: e.nativeEvent.text }) // Updating the email field value
            }
            otherStyles="mt-7"
            keyboardType="email-address" // Email-specific keyboard for input
          />

          {/* FormField component for password input */}
          <FormField
            title="Password"
            value={form.password}
            handleChange={
              (e) => setForm({ ...form, password: e.nativeEvent.text }) // Updating the password field value
            }
            otherStyles="mt-7"
          />

          {/* Custom button for submission */}
          <CustomButtom
            title="Sign Up"
            handlePress={submit} // Submit function is triggered on press
            containerStyles="mt-7"
            isLoading={isSubmitting} // Shows a loading indicator while submitting
          />

          {/* Link to sign-in page if the user already has an account */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/sign-in" // Link to the sign-in screen
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
