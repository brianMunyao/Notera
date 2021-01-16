import React, {useContext, useState} from 'react';
import {Image, StyleSheet, TextInput, ToastAndroid, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppButton from '../components/AppButton';

import {DataContext} from '../config/DataProvider';

import AppText from '../components/AppText';
import BasicScreen from '../components/BasicScreen';
import colors from '../config/colors';

const NameScreen = () => {
  const [name, setName] = useState('');
  const {saveName} = useContext(DataContext);

  const saveNewName = () => {
    const tempName = name.trim();
    if (tempName !== '') {
      saveName(tempName);
    }
  };
  const handleName = (text) => {
    if (text.length >= 10) {
      ToastAndroid.show('Max length is 10', ToastAndroid.SHORT);
    } else {
      setName(text);
    }
  };

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
      marginTop: 100,
      marginHorizontal: 10,
    },
    nameLbl: {
      fontSize: 45,
      color: colors.white,
      paddingHorizontal: 10,
      paddingTop: 20,
      letterSpacing: 0.5,
    },
    nameInput: {
      fontSize: 40,
      fontFamily: 'Nunito-SemiBold',
      color: colors.white,
      opacity: 0.8,
      paddingHorizontal: 30,
      paddingBottom: 20,
      letterSpacing: 0.5,
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
      <View style={styles.topInfo}>
        <Image source={require('../images/icon.png')} style={styles.image} />
        <AppText type="Bold" style={styles.nameLbl}>
          Enter your
        </AppText>
        <TextInput
          autoFocus
          maxLength={10}
          value={name}
          placeholder="name"
          onChangeText={handleName}
          style={styles.nameInput}
        />
      </View>
      <View style={styles.bottomInfo}>
        <AppButton
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={saveNewName}>
          Start
          <Icon name="arrow-forward" size={20} />
        </AppButton>
      </View>
    </BasicScreen>
  );
};

export default NameScreen;
