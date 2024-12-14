import { icons } from '@/constants';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Pressable, Image, Alert } from 'react-native';

// SearchInput component allows users to input a search query and navigate to the search results page
const SearchInput = ({
  initialQuery, // Optional initial query value for the input field
  placeholder, // Placeholder text displayed in the input field
}: {
  initialQuery?: string;
  placeholder: string;
}) => {
  // Get the current pathname using the expo-router
  const pathname = usePathname();

  // State to manage the input query
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular" // Styling for the input field
        value={query as string} // Bind input value to state
        placeholder={placeholder} // Display placeholder text
        placeholderTextColor="#CDCDE0" // Style for the placeholder text color
        onChangeText={(e: any) => setQuery(e)} // Update state when text changes
      />

      <Pressable
        onPress={() => {
          // If the search query is empty, show an alert asking the user to input a search term
          if (!query) {
            return Alert.alert(
              'Missing Query', // Alert title
              'Please input something to search result' // Alert message
            );
          }

          // If the current pathname is '/search', update the query parameter
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            // If not on the search page, navigate to the search page with the query as part of the URL
            router.push(`/search/${query}`);
          }
        }}
      >
        {/* Search icon displayed inside the pressable button */}
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </Pressable>
    </View>
  );
};

export default SearchInput;
