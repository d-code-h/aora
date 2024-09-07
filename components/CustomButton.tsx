import { CustomButtonType } from '@/lib/types';
import { clsx } from 'clsx';
import { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton: FC<CustomButtonType> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={clsx(
        'bg-secondary rounded-xl min-h-[62px] justify-center items-center',
        containerStyles,
        isLoading ? 'opacity-50' : ''
      )}
      disabled={isLoading}
    >
      <Text className={clsx('text-primary font-psemibold text-lg', textStyles)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
