import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Text> UserProfile </Text>
    </View>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
