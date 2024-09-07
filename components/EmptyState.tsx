import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { images } from '@/constants';
import CustomButtom from './CustomButton';
import { router } from 'expo-router';
import { EmptyStateType } from '@/lib/types';

const EmptyState: FC<EmptyStateType> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl  text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButtom
        title="Create video"
        handlePress={() => router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
