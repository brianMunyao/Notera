import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import BasicScreen from '../components/BasicScreen';
import colors from '../config/colors';

const SplashScreen = ({navigation, route}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageCon: {
      width: 150,
      height: 150,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });

  useEffect(() => {
    setTimeout(() => navigation.navigate(route.params.to), 2000);
  }, [navigation, route.params.to]);

  return (
    <BasicScreen style={styles.container}>
      <View style={styles.imageCon}>
        <Image style={styles.image} source={require('../images/icon.png')} />
      </View>
    </BasicScreen>
  );
};

export default SplashScreen;
