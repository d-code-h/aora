import { ImagePickerAsset } from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Models } from 'react-native-appwrite';

interface Form {
  userId?: string;
  title: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompt: string;
  handleChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

interface SearchType {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles?: string;
  keyboardType?: string;
}

interface AuthState {
  username?: string;
  email: string;
  password: string;
}

interface GlobalType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: Models.Document | null;
  setUser: Dispatch<SetStateAction<Models.Document | null>>;
  isLoading: boolean;
}

interface VideoCardType {
  video: Models.Document;
}

interface TrendingItemProps {
  activeItem: string;
  item: Models.Document & { video: string; thumbnail: string };
}

interface TrendingProps {
  posts: (Models.Document & { video: string; thumbnail: string })[];
}

interface InfoBoxType {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
}

export type {
  SearchType,
  AuthState,
  GlobalType,
  VideoCardType,
  TrendingItemProps,
  TrendingProps,
  InfoBoxType,
  Form,
};
