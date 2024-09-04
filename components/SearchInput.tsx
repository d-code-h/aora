import { icons } from '@/constants';
import clsx from 'clsx';
import { router, usePathname } from 'expo-router';
import { FC, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  Alert,
} from 'react-native';

interface SearchType {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles?: string;
  keyboardType?: string;
}

const SearchInput = ({ initialQuery }: { initialQuery: string }) => {
  // const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e: any) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing Query',
              'Please input something to search result'
            );
          }

          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
