import React from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';

import AppText from '../components/AppText';
import BasicScreen from '../components/BasicScreen';
import colors from '../config/colors';

const NewUserScreen = ({navigation}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingVertical: 30,
      paddingHorizontal: 10,
    },
    image: {
      width: 50,
      height: 50,
      marginHorizontal: 20,
      marginTop: '40%',
      marginBottom: 20,
    },
    title: {
      color: colors.white,
      fontSize: 45,
      opacity: 0.9,
      paddingLeft: 10,
    },
    subTitle: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      fontSize: 18,
      letterSpacing: 1,
      color: colors.white,
      opacity: 0.6,
    },
    btn: {
      marginLeft: 'auto',
      backgroundColor: colors.white,
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 30,
    },
    btnText: {
      color: colors.primary,
      fontSize: 20,
    },
  });
  return (
    <BasicScreen style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topInfo}>
        <Image source={require('../images/icon.png')} style={styles.image} />

        <AppText style={styles.title} type="Bold">
          Welcome to
        </AppText>
        <AppText style={styles.title} type="Bold">
          Notera
        </AppText>

        <AppText type="Light" style={styles.subTitle}>
          Manage your tasks easily.
        </AppText>
      </View>
      <View style={styles.bottomInfo}>
        <AppButton
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={() => navigation.navigate('NameScreen')}>
          Get Started
          <Icon name="arrow-forward" size={20} />
        </AppButton>
      </View>
    </BasicScreen>
  );
};

export default NewUserScreen;
