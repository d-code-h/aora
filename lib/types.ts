import { ImagePickerAsset } from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Models } from 'react-native-appwrite';

// Interface for the form used to create a video post
interface Form {
  userId?: string; // Optional user ID
  title: string; // Video post title
  video: ImagePickerAsset | null; // Video file selected for the post
  thumbnail: ImagePickerAsset | null; // Thumbnail image for the post
  prompt: string; // Description or prompt for the video post
  handleChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void; // Optional change handler for input fields
}

// Interface for search functionality, including title, value, and placeholder
interface SearchType {
  title?: string; // Optional title for the search field
  value?: string; // Current value of the search input
  placeholder?: string; // Placeholder text for the search input
  handleChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void; // Change handler for the search input
  otherStyles?: string; // Optional additional styles
  keyboardType?: string; // Keyboard type (e.g., 'numeric', 'default')
}

// Interface for authentication state, holding username, email, and password
interface AuthState {
  username?: string; // Optional username
  email: string; // User email
  password: string; // User password
}

// Interface for video card component, which expects a video document
interface VideoCardType {
  video: Models.Document; // The video post document
}

// Global state interface for managing user authentication, posts, and preferences
interface GlobalType {
  isLoggedIn: boolean; // Flag to check if the user is logged in
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>; // Function to set the login status
  user: Models.Document | null; // The current user document, or null if not logged in
  setUser: Dispatch<SetStateAction<Models.Document | null>>; // Function to set the user document
  isLoading: boolean; // Flag to indicate if data is loading
  posts: Models.Document[]; // Array of posts
  refetch: () => void; // Function to refetch data (e.g., posts or user info)
  userPrefs: Models.Preferences | null; // User preferences, or null if not available
  setUserPrefs: Dispatch<SetStateAction<Models.Preferences>>; // Function to set user preferences
}

// Interface for a trending item, including the active item and the item document
interface TrendingItemProps {
  activeItem: string; // The ID of the active item being viewed
  item: Models.Document; // The post document for the trending item
}

// Interface for the trending posts component, which expects a list of posts
interface TrendingProps {
  posts: Models.Document[]; // Array of trending posts
}

// Interface for info box component, including title, subtitle, and styles
interface InfoBoxType {
  title: string | number; // Title of the info box, can be a string or number
  subtitle?: string; // Optional subtitle for the info box
  containerStyles?: string; // Optional styles for the container
  titleStyles: string; // Styles for the title text
}

// Interface for a custom button component, including title, press handler, and styles
interface CustomButtonType {
  title: string; // Title text of the button
  handlePress: () => void; // Function to handle button press
  containerStyles: string; // Styles for the button container
  textStyles?: string; // Optional styles for the button text
  isLoading?: boolean; // Optional loading state to show a loading spinner
}

// Interface for empty state display, used when no data is available
interface EmptyStateType {
  title: string; // Title of the empty state message
  subtitle: string; // Subtitle for the empty state message
}

// Interface for a form field component, including title, value, and change handler
interface FormFieldType {
  title: string; // Title or label for the form field
  value: string; // Current value of the input field
  placeholder?: string; // Optional placeholder text
  handleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void; // Change handler for input
  otherStyles: string; // Styles for the input field container
  keyboardType?: string; // Optional keyboard type (e.g., 'numeric')
}

export {
  Form,
  SearchType,
  AuthState,
  TrendingItemProps,
  TrendingProps,
  InfoBoxType,
  VideoCardType,
  CustomButtonType,
  GlobalType,
  EmptyStateType,
  FormFieldType,
};
