import React, {useEffect, useRef, useState, useImperativeHandle} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {memoWithRef, scaleSize} from '../../../utils';

const Timer = (props, ref) => {
  const {
    duration = 15,
    animationBirdWaiting = () => {},
    currentQuestion = 1,
  } = props || {};
  const [timer, setTimer] = useState(duration);
  let interval = useRef(null);
  let timeForReadQuestion = useRef(null);

  useImperativeHandle(ref, () => ({
    resetTimer,
    startCowDown,
  }));

  const resetTimer = () => {
    interval.current && clearInterval(interval.current);
    setTimer(duration);
  };

  const startCowDown = () => {
    timeForReadQuestion.current = setTimeout(
      () => {
        interval.current = setInterval(() => {
          setTimer(pre => pre - 1);
        }, 1000);
      },
      currentQuestion === 1 ? 5000 : 2000,
    );
  };

  useEffect(() => {
    if (timer === 10) {
      animationBirdWaiting?.();
    }
  }, [timer, animationBirdWaiting]);

  useEffect(() => {
    if (timer === 0) {
      interval.current && clearInterval(interval.current);
    }
  }, [timer]);

  useEffect(() => {
    return () => {
      timeForReadQuestion.current && clearTimeout(timeForReadQuestion.current);
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.txtTime}> {`${timer}s`} </Text>
    </View>
  );
};
export default memoWithRef(Timer);

const styles = StyleSheet.create({
  container: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    borderWidth: scaleSize(3),
    borderColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
    // 27AE60
  },
  txtTime: {
    color: '#27AE60',
    fontWeight: '800',
    fontSize: scaleSize(13),
  },
});
