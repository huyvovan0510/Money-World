import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import lottieAnimated from '../../../assets/json';
import {memoWithRef, scaleSize} from '../../../utils';

const Header = ({}, ref) => {
  const goldPotRef = useRef(null);
  const coinRef = useRef(null);
  const bursLeftRef = useRef(null);
  const bursRightRef = useRef(null);

  const [amountMoney, setAmountMoney] = useState(1000);
  const [amountCoin, setAmountCoin] = useState(0);
  let timeout = null;

  useEffect(() => {
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);

  const updateCoin = () => {
    timeout = setTimeout(() => {
      goldPotRef?.current?.play();
      bursLeftRef?.current?.play();
      setAmountMoney(pre => pre + 50);
    }, 1000);
    coinRef?.current?.play();
    bursRightRef?.current?.play();
    setAmountCoin(pre => pre + 1);
  };

  useImperativeHandle(ref, () => ({
    updateCoin,
  }));

  return (
    <View style={styles.header}>
      <View>
        <View style={styles.leftBox}>
          <LottieView
            ref={goldPotRef}
            style={styles.goldPot}
            autoPlay={false}
            loop={false}
            source={lottieAnimated.gold_pot}
          />
          <Text style={styles.txtMoney}>{`$ ${amountMoney}`}</Text>
        </View>
        <LottieView
          ref={bursLeftRef}
          style={styles.burstAnimatedLeft}
          autoPlay={false}
          loop={false}
          source={lottieAnimated.burst}
        />
      </View>

      <View>
        <View style={styles.rightBox}>
          <Text style={styles.txtPoint}>{`${amountCoin}/8`}</Text>
          <LottieView
            ref={coinRef}
            style={styles.lottieCoin}
            autoPlay={false}
            loop={false}
            source={lottieAnimated.coin}
          />
        </View>
        <LottieView
          ref={bursRightRef}
          style={styles.burstAnimatedRight}
          autoPlay={false}
          loop={false}
          source={lottieAnimated.burst}
        />
      </View>
    </View>
  );
};
export default memoWithRef(Header);
const styles = StyleSheet.create({
  header: {
    marginHorizontal: scaleSize(17),
    paddingBottom: scaleSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF99',
    height: scaleSize(40),
    borderRadius: scaleSize(20),
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF99',
    height: scaleSize(40),
    overflow: 'hidden',
    borderRadius: scaleSize(20),
  },
  goldPot: {
    height: scaleSize(70),
    width: scaleSize(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -scaleSize(5),
  },
  txtMoney: {
    marginLeft: -scaleSize(20),
    marginRight: scaleSize(20),
    fontSize: scaleSize(16),
    fontWeight: '700',
    color: '#ffff',
  },
  txtPoint: {
    marginLeft: scaleSize(20),
    marginRight: scaleSize(-10),
    fontSize: scaleSize(16),
    fontWeight: '700',
    color: '#ffff',
  },
  lottieCoin: {
    height: scaleSize(70),
    width: scaleSize(70),
    marginRight: -scaleSize(10), // backgroundColor: 'red',
  },
  burstAnimatedRight: {
    height: scaleSize(70),
    width: scaleSize(70),
    right: -scaleSize(3),
    top: -scaleSize(5),
    position: 'absolute',
  },
  burstAnimatedLeft: {
    height: scaleSize(70),
    width: scaleSize(70),
    right: scaleSize(0),
    top: -scaleSize(5),
    position: 'absolute',
  },
});
