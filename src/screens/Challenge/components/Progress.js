import React, {useRef, useEffect, memo} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Animated, {Easing, Value} from 'react-native-reanimated';
import {scaleSize} from '../../../utils';
const {width} = Dimensions.get('screen');
const WIDTH_PROGRESS = width - 34;
const Progress = props => {
  const progressAnimated = useRef(new Value(0));
  const {total = 5, current = 0} = props || {};

  useEffect(() => {
    const eachLevel = WIDTH_PROGRESS / total;
    Animated.timing(progressAnimated.current, {
      toValue: current * eachLevel,
      duration: 500,
      easing: Easing.ease,
    }).start();
  }, [current, total]);

  return (
    <View style={styles.progressContainer}>
      <Animated.View
        View
        style={[
          styles.contentProgress,
          {
            width: progressAnimated.current,
          },
        ]}
      />
    </View>
  );
};
export default memo(Progress);
const styles = StyleSheet.create({
  progressContainer: {
    marginHorizontal: scaleSize(17),
    height: scaleSize(19),
    backgroundColor: '#ffffff30',
    borderRadius: scaleSize(20),
    overflow: 'hidden',
    marginTop: scaleSize(20),
    marginBottom: scaleSize(18),
  },
  contentProgress: {
    backgroundColor: '#ffff',
    borderRadius: scaleSize(20),
    flex: 1,
  },
});
