import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import BasicScreen from '../components/BasicScreen';
import colors from '../config/colors';

const WelcomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: '100%',
    },
  });

  return (
    <BasicScreen style={styles.container}>
      <View>{/* <Image source={require('../images/icon.png')} /> */}</View>
    </BasicScreen>
  );
};

export default WelcomeScreen;
