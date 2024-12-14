import { CustomButtonType } from '@/lib/types'; // Importing the type for button props to enforce type safety
import { clsx } from 'clsx'; // Importing clsx for conditional className concatenation
import { FC } from 'react'; // Importing FC (Functional Component) type from React
import { Pressable, Text } from 'react-native'; // Importing React Native components: Pressable (for button interaction) and Text (for displaying text)

const CustomButton: FC<CustomButtonType> = ({
  title, // Button text
  handlePress, // Function to handle button press
  containerStyles, // Custom styles for the button container
  textStyles, // Custom styles for the button text
  isLoading, // Flag to indicate loading state, disables button and reduces opacity when true
}) => {
  return (
    <Pressable
      onPress={handlePress} // The function to run when the button is pressed
      // activeOpacity={0.7}  // This would adjust the opacity on press, currently commented out
      className={clsx(
        'bg-secondary rounded-xl min-h-[62px] justify-center items-center active:opacity-50', // Default styling for the button (background color, border radius, minimum height, centering)
        containerStyles, // Allowing additional custom styles passed through the `containerStyles` prop
        isLoading ? 'opacity-50' : '' // If the button is loading, reduce opacity to show the loading state
      )}
      disabled={isLoading} // Disables the button while loading to prevent further clicks
    >
      <Text className={clsx('text-primary font-psemibold text-lg', textStyles)}>
        {title} // Displays the button title passed as a prop
      </Text>
    </Pressable>
  );
};

export default CustomButton;
