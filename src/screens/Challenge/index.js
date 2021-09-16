import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/Header';
import {scaleSize} from '../../utils';
import Progress from './components/Progress';
import TextQuestion from './components/TextQuestion';
import BoxAnswer from './components/BoxAnswer';
import PenguinAnimation from './components/PenguinAnimation';
import FooterComponents from './components/FooterComponents';

const {width: WIDTH_DEVICE} = Dimensions.get('window');

const data = [
  {
    question: 'What your name ? ',
    answers: [
      {id: '1', title: 'Elon musk'},
      {id: '1', title: 'Tim Cook'},
      {id: '1', title: 'Greg Smith'},
      {id: '1', title: 'Huy vo van'},
    ],
    correctAnswer: 'Greg Smith',
  },
  {
    question: 'Which one is the name of a bird ? ',
    answers: [
      {id: '1', title: 'Cat'},
      {id: '1', title: 'Tom'},
      {id: '1', title: 'Jerry'},
      {id: '1', title: 'Penguin'},
    ],
    correctAnswer: 'Penguin',
  },
  {
    question: 'Are you ok ? ',
    answers: [
      {id: '1', title: 'Yes I"m good'},
      {id: '1', title: 'Bad'},
      {id: '1', title: 'Sad'},
      {id: '1', title: 'nothng'},
    ],
    correctAnswer: 'Yes I"m good',
  },
  {
    question: 'How old are you ? ',
    answers: [
      {id: '1', title: '12'},
      {id: '1', title: '23'},
      {id: '1', title: '53'},
      {id: '1', title: '22'},
    ],
    correctAnswer: '22',
  },
  {
    question: ' 1+1 ?',
    answers: [
      {id: '1', title: '4'},
      {id: '1', title: '2'},
      {id: '1', title: '3'},
      {id: '1', title: '29'},
    ],
    correctAnswer: '2',
  },
];

const Challenge = () => {
  const headerRef = useRef(null);
  const boxAnswerRef = useRef(null);
  const penguinRef = useRef(null);
  const footerRef = useRef(null);
  let timeout = null;
  const [indexQuestion, setIndexQuestion] = useState(0);

  const animationBirdWaiting = () => {
    penguinRef?.current?.birdWaiting();
  };

  useEffect(() => {
    footerRef?.current.startClock();
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  const onNextQuestion = correct => {
    if (correct) {
      footerRef?.current.resetClock();
      penguinRef?.current?.congratulations();
      headerRef.current?.updateCoin();
    } else {
      alert('The answer is not correct !! ');
      setIndexQuestion(0);
      footerRef?.current.resetClock();
      boxAnswerRef?.current?.clearData();
      penguinRef?.current?.resetAnimation();
      return;
    }

    timeout = setTimeout(() => {
      if (indexQuestion === data?.length - 1) {
        alert('Congratulations !! ');
        footerRef?.current?.resetClock();
      }
      setIndexQuestion(pre => pre + 1);

      boxAnswerRef?.current?.clearData();
      penguinRef?.current?.resetAnimation();
      footerRef?.current.startClock();
    }, 2500);
  };

  return (
    <LinearGradient style={styles.container} colors={['#F275AA', '#FFBE00']}>
      <SafeAreaView style={styles.content}>
        <Header ref={headerRef} />
        <Progress total={5} current={indexQuestion + 1} />
        <Text style={styles.label}>{`Question #${
          indexQuestion + 1
        } of 5`}</Text>
        <TextQuestion
          currentQuestion={indexQuestion + 1}
          content={data[indexQuestion]?.question}
        />
        <PenguinAnimation ref={penguinRef} />
        <BoxAnswer
          currentQuestion={indexQuestion + 1}
          ref={boxAnswerRef}
          onNextQuestion={onNextQuestion}
          questionData={data[indexQuestion]}
        />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <FooterComponents
            currentQuestion={indexQuestion + 1}
            ref={footerRef}
            animationBirdWaiting={animationBirdWaiting}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Challenge;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    marginHorizontal: scaleSize(17),
    fontSize: scaleSize(13),
    color: '#fff',
    fontWeight: '700',
    marginBottom: scaleSize(10),
  },
  boxAnswer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: scaleSize(30),
  },
  itemAnswer: {
    width: (WIDTH_DEVICE - 48) / 2,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    height: scaleSize(48),
    marginBottom: scaleSize(16),
    alignItems: 'center',
    borderRadius: scaleSize(24),
  },
});
