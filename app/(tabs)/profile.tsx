import { Text, View } from 'react-native';
import { Link } from 'expo-router';

const profile = () => {
  return (
    <View>
      <Text>Profile</Text>

      <Link href="/">Back to Home</Link>
    </View>
  );
};

export default profile;
