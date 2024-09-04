import { View, Text } from 'react-native';
import React, { FC } from 'react';
import clsx from 'clsx';

interface InfoBoxType {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
}

const InfoBox: FC<InfoBoxType> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text
        className={clsx('text-white text-center font-psemibold', titleStyles)}
      >
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
