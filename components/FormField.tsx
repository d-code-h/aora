import { icons } from '@/constants'; // Importing icons from constants (e.g., eye icons for password visibility toggle)
import { FormFieldType } from '@/lib/types'; // Importing the type for the component props
import clsx from 'clsx'; // Importing clsx for conditionally combining class names
import { FC, useState } from 'react'; // Importing React and useState hook
import { View, Text, TextInput, Pressable, Image } from 'react-native'; // Importing components from React Native

// FormField component that displays a labeled input field with optional password visibility toggle
const FormField: FC<FormFieldType> = ({
  title, // Title text (used to identify the field, e.g., "Password")
  value, // The current value of the input field
  placeholder, // Placeholder text for the input field
  handleChange, // Function to handle changes to the input field
  otherStyles, // Custom styles for the component
}) => {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  return (
    <View className={clsx('space-y-2', otherStyles)}>
      {' '}
      // View container with custom styles passed via otherStyles prop
      {/* Display the field title (label) */}
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      {/* Input field container with styles */}
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
        {/* TextInput for user input */}
        <TextInput
          className="flex-1 text-white font-psemibold text-base" // Styles for the input field
          value={value} // The current value of the input field
          placeholder={placeholder} // Placeholder text when input is empty
          placeholderTextColor="#7b7b8b" // Color for the placeholder text
          onChange={handleChange} // Event handler for when the text in the input changes
          secureTextEntry={title === 'Password' && !showPassword} // Conditionally hide/show text for "Password" field
        />

        {/* Password visibility toggle icon (only visible for "Password" field) */}
        {title === 'Password' && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {' '}
            // Toggle the visibility state when pressed
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide} // Show either eye icon or eye-hide icon based on state
              className="w-6 h-6" // Size of the icon
              resizeMode="contain" // Ensure the icon fits within the container
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;
