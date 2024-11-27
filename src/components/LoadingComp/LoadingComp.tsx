import React, {useEffect, useRef} from 'react';
import {Animated, Image, Modal, StyleSheet, View} from 'react-native';
import {h, w} from 'utils/responsive';

const icon = require('assets/images/loader_icon.png');

const LoadingComp = ({closeLoading}: any) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000, // Rotation duration in ms
          useNativeDriver: true,
        }),
      ).start();
    };

    startRotation();
  }, [rotation]);

  const handleCloseRequest = () => {
    if (closeLoading) {
      closeLoading();
      return;
    }
    return null;
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      visible
      onRequestClose={handleCloseRequest}>
      <View style={styles.centeredView}>
        <View style={styles.lottieImageContainer}>
          <Animated.Image
            source={icon}
            style={{
              width: w(40),
              height: w(40),
              transform: [{rotate}],
              borderRadius: w(16),
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(132, 138, 163, 0.70)',
  },
  lottieImageContainer: {
    width: w(138),
    height: h(120),
    // backgroundColor: '#fff',
    borderRadius: w(99),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComp;
