import { icons } from '@/constants';
import clsx from 'clsx';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';

const FormField = ({
  title,
  value,
  placeholder,
  handleChange,
  otherStyles,
  ...props
}: {
  title: string;
  value: string;
  placeholder?: string;
  handleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles: string;
  keyboardType?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={clsx('space-y-2', otherStyles)}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChange={handleChange}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
