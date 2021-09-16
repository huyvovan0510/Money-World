import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Jars = () => {
  return (
    <View style={styles.container}>
      <Text> Jars </Text>
    </View>
  );
};

export default Jars;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
