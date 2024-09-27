import { CustomButtonType } from '@/lib/types';
import { clsx } from 'clsx';
import { FC } from 'react';
import { Pressable, Text } from 'react-native';

const CustomButton: FC<CustomButtonType> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <Pressable
      onPress={handlePress}
      // activeOpacity={0.7}
      className={clsx(
        'bg-secondary rounded-xl min-h-[62px] justify-center items-center active:opacity-50',
        containerStyles,
        isLoading ? 'opacity-50' : ''
      )}
      disabled={isLoading}
    >
      <Text className={clsx('text-primary font-psemibold text-lg', textStyles)}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
