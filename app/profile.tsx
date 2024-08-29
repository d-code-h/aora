import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <Link style={styles.link} href="/">
        Back to Home
      </Link>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  link: {
    color: '#000080',
  },
});
