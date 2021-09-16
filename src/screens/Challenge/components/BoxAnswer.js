import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {Easing, Value} from 'react-native-reanimated';
import images from '../../../assets/image';
import {memoWithRef, scaleSize} from '../../../utils';
const {width: WIDTH_DEVICE} = Dimensions.get('window');

const getOderAnswer = index => {
  switch (index) {
    case 0:
      return 'A';
    case 1:
      return 'B';
    case 2:
      return 'A';
    case 3:
      return 'D';
    default:
      break;
  }
};

const BoxAnswer = (
  {questionData = {}, onNextQuestion, currentQuestion = 1},
  ref,
) => {
  const [selectedOption, setSelectedOption] = useState('');
  const {answers} = questionData || {};
  const [isAnswer, setIsAnswer] = useState(false);
  const displayAnimation = useRef(new Value(0.0001)).current;
  const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    setTimeout(
      () => {
        Animated.timing(displayAnimation, {
          duration: 400,
          toValue: 1,
          easing: Easing.ease,
        }).start();
      },
      currentQuestion === 1 ? 5000 : 2000,
    );
  }, [answers]);
  const clearData = () => {
    setSelectedOption('');
    setIsAnswer(false);
  };

  useImperativeHandle(ref, () => ({
    clearData,
  }));

  const onClickAnswer = index => {
    setSelectedOption(answers[index].title);
    setIsAnswer(true);
    if (answers[index].title === questionData.correctAnswer) {
      onNextQuestion(true);
    } else {
      onNextQuestion(false);
    }
  };

  const renderAnswer = (item, index) => {
    const order = getOderAnswer(index);
    return (
      <TouchableAnimated
        disabled={isAnswer}
        style={[
          styles.itemAnswer,
          {
            backgroundColor:
              item.title === selectedOption
                ? selectedOption === questionData.correctAnswer
                  ? '#27AE60'
                  : 'red'
                : '#ffff',
          },
          {
            transform: [
              {
                scale: displayAnimation,
              },
            ],
          },
        ]}
        key={`${index}`}
        onPress={() => {
          onClickAnswer(index);
        }}>
        <Text style={styles.txtOder}>{`${order}: `}</Text>
        <Text style={styles.txtAnswer}>{item?.title}</Text>
        {item.title === selectedOption && (
          <Image
            source={
              selectedOption === questionData.correctAnswer
                ? images.ic_check
                : images.ic_check
            }
            style={styles.icCheck}
          />
        )}
      </TouchableAnimated>
    );
  };
  return <View style={styles.boxAnswer}>{answers?.map(renderAnswer)}</View>;
};
export default memoWithRef(BoxAnswer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: scaleSize(17),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  process: {
    width: 300,
    backgroundColor: '#fff',
    height: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: scaleSize(13),
    color: '#fff',
    fontWeight: '700',
    marginBottom: scaleSize(10),
  },
  boxAnswer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: scaleSize(50),
    marginHorizontal: scaleSize(17),
  },
  itemAnswer: {
    width: (WIDTH_DEVICE - 48) / 2,
    justifyContent: 'center',
    height: scaleSize(48),
    marginBottom: scaleSize(16),
    alignItems: 'center',
    borderRadius: scaleSize(24),
    flexDirection: 'row',
  },
  icCheck: {
    position: 'absolute',
    width: scaleSize(20),
    height: scaleSize(20),
    right: scaleSize(20),
  },
  txtOder: {
    fontSize: scaleSize(18),
    fontWeight: '700',
  },
  txtAnswer: {
    fontSize: scaleSize(18),
    fontWeight: '700',
  },
});
