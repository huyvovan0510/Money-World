import React, {useRef, useEffect, useCallback} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {scaleSize} from '../../../utils';

const TextQuestion = props => {
  const textAnimatedValue = useRef([]).current;
  const {content = '', currentQuestion = 1} = props || {};
  const arrContent = content?.trim()?.split(' ');

  arrContent.forEach((_, index) => {
    textAnimatedValue[index] = new Animated.Value(0);
  });

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        runAnimated();
      },
      currentQuestion === 1 ? 3000 : 1000,
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [content, runAnimated, currentQuestion]);

  const runAnimated = useCallback((value = 1) => {
    const animations = arrContent.map((_, index) => {
      return Animated.timing(textAnimatedValue[index], {
        duration: 500,
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.ease,
      });
    });

    Animated.stagger(300, animations).start();
  }, []);
  return (
    <View style={styles.container}>
      {arrContent.map((word, index) => {
        return (
          <Animated.Text
            key={word + index}
            style={[styles.txtQuestion, {opacity: textAnimatedValue[index]}]}>
            {word}
            {arrContent.length > index ? ' ' : ''}
          </Animated.Text>
        );
      })}
    </View>
  );
};
export default TextQuestion;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: scaleSize(17),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  txtQuestion: {
    color: '#fff',
    fontWeight: '700',
    fontSize: scaleSize(20),
    lineHeight: scaleSize(30),
  },
});
