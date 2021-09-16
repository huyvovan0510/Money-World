import AnimatedLottieView from 'lottie-react-native';
import React, {useRef, useEffect, useImperativeHandle} from 'react';
import {Animated, Easing} from 'react-native';
import lottieAnimated from '../../../assets/json';
import {memoWithRef, scaleSize} from '../../../utils';

const PenguinAnimation = ({}, ref) => {
  const lottieRef = useRef(null);
  const animated = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: 0.7,
      duration: 7000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const resetAnimation = () => {
    Animated.timing(animated.current, {
      toValue: 0.7,
      duration: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const birdWaiting = () => {
    Animated.timing(animated.current, {
      toValue: 0.9,
      duration: 7000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const congratulations = () => {
    Animated.timing(animated.current, {
      toValue: 0.9,
      duration: 0,
      useNativeDriver: true,
    }).start(finish => {
      if (finish) {
        Animated.timing(animated.current, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  useImperativeHandle(ref, () => ({
    congratulations,
    birdWaiting,
    resetAnimation,
  }));

  return (
    <AnimatedLottieView
      ref={lottieRef}
      style={{
        height: scaleSize(140),
        marginTop: scaleSize(10),
      }}
      progress={animated.current}
      source={lottieAnimated.bird}
    />
  );
};
export default memoWithRef(PenguinAnimation);
