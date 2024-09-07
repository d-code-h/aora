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
  item: Models.Document;
}

interface TrendingProps {
  posts: Models.Document[];
}

interface InfoBoxType {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
}

interface CustomButtonType {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
}

interface EmptyStateType {
  title: string;
  subtitle: string;
}

interface FormFieldType {
  title: string;
  value: string;
  placeholder?: string;
  handleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles: string;
  keyboardType?: string;
}

export type {
  SearchType,
  AuthState,
  GlobalType,
  VideoCardType,
  TrendingItemProps,
  TrendingProps,
  InfoBoxType,
  CustomButtonType,
  EmptyStateType,
  Form,
  FormFieldType,
};
