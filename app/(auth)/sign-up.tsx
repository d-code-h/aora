import {
  View,
  Text,
  ScrollView,
  Image,
  TextInputChangeEventData,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButtom from '@/components/CustomButtom';
import { Link } from 'expo-router';

interface AuthState {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [form, setForm] = useState<AuthState>({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 py-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChange={(e) =>
              setForm({ ...form, username: e.nativeEvent.text })
            }
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) =>
              setForm({ ...form, email: e.nativeEvent.text })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e) =>
              setForm({ ...form, password: e.nativeEvent.text })
            }
            otherStyles="mt-7"
          />

          <CustomButtom
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

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
