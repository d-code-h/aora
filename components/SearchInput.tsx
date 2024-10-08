import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Pressable, Image, Alert } from 'react-native';

const SearchInput = ({
  initialQuery,
  placeholder,
}: {
  initialQuery?: string;
  placeholder: string;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query as string}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e: any) => setQuery(e)}
      />

      <Pressable
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
      </Pressable>
    </View>
  );
};

export default SearchInput;
