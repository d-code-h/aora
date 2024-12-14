import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButtom from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

import { AuthState } from '@/lib/types';

const SignUp = () => {
  const [form, setForm] = useState<AuthState>({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(
        form.email,
        form.password,
        form.username as string
      );

      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
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
            handleChange={(e) =>
              setForm({ ...form, username: e.nativeEvent.text })
            }
            otherStyles="mt-10"
          />

          {/* FormField component for email input */}
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) =>
              setForm({ ...form, email: e.nativeEvent.text })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* FormField component for password input */}
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) =>
              setForm({ ...form, password: e.nativeEvent.text })
            }
            otherStyles="mt-7"
          />

          {/* Custom button for submission */}
          <CustomButtom
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* Link to sign-in page if the user already has an account */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href="/sign-in"
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
