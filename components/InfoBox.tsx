import { View, Text } from 'react-native';
import React, { FC } from 'react';
import clsx from 'clsx';

import { InfoBoxType } from '@/lib/types';

const InfoBox: FC<InfoBoxType> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      {/* Title Text with custom styles applied */}
      <Text
        className={clsx('text-white text-center font-psemibold', titleStyles)}
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
