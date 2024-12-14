import { View, Text } from 'react-native';
import React, { FC } from 'react';
import clsx from 'clsx';

import { InfoBoxType } from '@/lib/types';

// InfoBox component displays a box with a title and subtitle
const InfoBox: FC<InfoBoxType> = ({
  title, // The main title of the info box
  subtitle, // The subtitle or description under the title
  containerStyles, // Optional custom styles for the container
  titleStyles, // Optional custom styles for the title text
}) => {
  return (
    // The container View, with optional custom styles applied via containerStyles
    <View className={containerStyles}>
      {/* Title Text with custom styles applied */}
      <Text
        className={clsx('text-white text-center font-psemibold', titleStyles)} // Title with predefined styles and optional custom styles
      >
        {title} {/* Displays the title */}
      </Text>

      {/* Subtitle Text with predefined styles */}
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle} {/* Displays the subtitle */}
      </Text>
    </View>
  );
};

export default InfoBox;
