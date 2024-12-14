import { View, Text, ScrollView, Image, Alert } from 'react-native'; // Importing necessary components from React Native
import React, { useState } from 'react'; // Importing React and useState hook
import { SafeAreaView } from 'react-native-safe-area-context'; // Importing SafeAreaView to avoid overlapping with the device status bar
import { images } from '@/constants'; // Importing images from constants
import FormField from '@/components/FormField'; // Importing FormField component for form inputs
import CustomButtom from '@/components/CustomButton'; // Importing CustomButtom component for submit button
import { Link, router } from 'expo-router'; // Importing Link and router for navigation
import { getCurrentUser, signIn } from '@/lib/appwrite'; // Importing authentication functions from appwrite lib
import { useGlobalContext } from '@/context/GlobalProvider'; // Importing context to manage user state
import { AuthState } from '@/lib/types';

const SignIn = () => {
  // Defining state for form data (email and password)
  const [form, setForm] = useState<AuthState>({
    email: '',
    password: '',
  });

  // Defining state to handle form submission loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructuring functions from GlobalContext to update user and login state
  const { setUser, setIsLoggedIn, setUserPrefs } = useGlobalContext();

  // Function to handle form submission
  const submit = async () => {
    // Basic validation to check if both fields are filled
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields'); // If not, show an error alert
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      // Try to sign in with the provided email and password
      await signIn(form.email, form.password);

      // Fetch the current user data after successful sign in
      const result = await getCurrentUser();

      // Extract currentUser and userPrefs from the result
      const { currentUser, userPrefs } = result;

      // Update the context state with the current user and preferences
      setUser(currentUser); // Set the user document
      setUserPrefs(userPrefs); // Set the user preferences

      // Set logged-in state to true
      setIsLoggedIn(true);

      // Navigate to the home screen
      router.replace('/home');
    } catch (error: any) {
      console.log(error); // Log any error that occurs during sign in

      // Show an error alert if sign in fails
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false); // Set submitting state to false after the request
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* Scrollable view for the sign-in form */}
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 py-6">
          {/* Displaying logo */}
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          {/* Title of the sign-in screen */}
          <Text className="text-2xl text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          {/* FormField component for email input */}
          <FormField
            title="Email"
            value={form.email}
            handleChange={
              (e) => setForm({ ...form, email: e.nativeEvent.text }) // Updating email state
            }
            otherStyles="mt-7"
            keyboardType="email-address" // Email-specific keyboard for input
          />

          {/* FormField component for password input */}
          <FormField
            title="Password"
            value={form.password}
            handleChange={
              (e) => setForm({ ...form, password: e.nativeEvent.text }) // Updating password state
            }
            otherStyles="mt-7"
          />

          {/* Custom button for submission */}
          <CustomButtom
            title="Sign In"
            handlePress={submit} // Submit function when pressed
            containerStyles="mt-7"
            isLoading={isSubmitting} // Display loading state when submitting
          />

          {/* Link to sign-up page if the user doesn't have an account */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/sign-up" // Link to the sign-up screen
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
