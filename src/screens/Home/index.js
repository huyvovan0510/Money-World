import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text> Home </Text>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});