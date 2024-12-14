import { icons } from '@/constants';
import { FormFieldType } from '@/lib/types';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';

const FormField: FC<FormFieldType> = ({
  title,
  value,
  placeholder,
  handleChange,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={clsx('space-y-2', otherStyles)}>
      {/* Display the field title (label) */}
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      {/* Input field container with styles */}
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
        {/* TextInput for user input */}
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChange={handleChange}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {/* Password visibility toggle icon (only visible for "Password" field) */}
        {title === 'Password' && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;
