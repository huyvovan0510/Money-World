import {Dimensions} from 'react-native';
import deepEqual from 'deep-equal';
import {forwardRef, memo} from 'react';
const guidelineBaseWidth = 375;
const DEVICE_WIDTH = Dimensions.get('window').width;

export const scaleSize = size => (DEVICE_WIDTH / guidelineBaseWidth) * size;

export const memoWithRef = component => {
  return memo(forwardRef(component), (prevProps, nextProps) =>
    deepEqual(prevProps, nextProps),
  );
};
