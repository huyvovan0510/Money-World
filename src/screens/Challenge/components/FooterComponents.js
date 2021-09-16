import React, {useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import {memoWithRef, scaleSize} from '../../../utils';
import CountdownCircle from 'react-native-countdown-circle';
import Svg, {Circle, G} from 'react-native-svg';
import Timer from './Timer';

const userData = [
  {
    id: 1,
    avatar:
      'https://image.freepik.com/free-vector/cute-boy-barista-character-apron-cartoon-character-illustration_56104-407.jpg',
  },
  {
    id: 2,
    avatar:
      'https://image.freepik.com/free-vector/cute-boy-barista-apron-with-coffee-cartoon-character-illustratio_56104-413.jpg',
  },
  {
    id: 3,
    avatar:
      'https://image.freepik.com/free-vector/beautiful-chef-girl-holding-empty-plate-cartoon-illustration_56104-314.jpg',
  },
  {
    id: 4,
    avatar:
      'https://image.freepik.com/free-vector/chef-hat-mascot-illustration-riding-giant-pencil-cute-style-design-t-shirt-sticker-logo-element_152558-11359.jpg',
  },
  {
    id: 5,
    avatar:
      'https://image.freepik.com/free-vector/cute-boy-barista-character-apron-cartoon-character-illustration_56104-407.jpg',
  },
];

const FooterComponents = (
  {animationBirdWaiting = () => {}, currentQuestion = 1},
  ref,
) => {
  const timerRef = useRef(null);
  const renderUser = (item, index) => {
    return (
      <View key={`${index}`} style={styles.boxAvatar}>
        <Image source={{uri: item?.avatar}} style={styles.avatar} />
      </View>
    );
  };

  useImperativeHandle(ref, () => ({
    startClock,
    resetClock,
  }));

  const startClock = () => {
    timerRef?.current?.startCowDown?.();
  };

  const resetClock = () => {
    timerRef?.current?.resetTimer?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxUser}>
        {userData.map(renderUser)}
        <Text style={styles.txtMore}>{'+24 more'}</Text>
      </View>
      <View>
        <Timer
          currentQuestion={currentQuestion}
          ref={timerRef}
          animationBirdWaiting={animationBirdWaiting}
        />
      </View>
    </View>
  );
};

export default memoWithRef(FooterComponents);
const styles = StyleSheet.create({
  container: {
    padding: scaleSize(16),
    backgroundColor: '#fff0d1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: scaleSize(32),
    height: scaleSize(32),
    borderRadius: scaleSize(16),
  },
  boxUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxAvatar: {
    borderWidth: 2,
    borderRadius: scaleSize(16),
    overflow: 'hidden',
    borderColor: '#fff',
    marginRight: scaleSize(-5),
  },
  txtMore: {
    fontSize: scaleSize(11),
    fontWeight: '600',
    color: '#555555',
    marginLeft: scaleSize(8),
  },
});
