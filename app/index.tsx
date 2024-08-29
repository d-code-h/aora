import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-8xl text-secondary-100 font-pblack">Aora!</Text>
      <Link href="/home">Go to Home</Link>
      <StatusBar style="auto" />
    </View>
  );
}
