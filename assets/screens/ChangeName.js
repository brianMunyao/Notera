import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BasicScreen from '../components/BasicScreen';
import colors from '../config/colors';

const ChangeName = ({navigation: {goBack}}) => {
  const {changeSettings, settings, darkTheme} = useContext(DataContext);

  const [newName, setNewName] = useState('');

  const styles = StyleSheet.create({
    topBar: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    back: {
      fontSize: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    body: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      paddingHorizontal: 20,
      paddingTop: 25,
      paddingBottom: 5,
      letterSpacing: 0.5,
    },
    currentName: {
      padding: 10,
    },

    btn: {
      backgroundColor: colors.primary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      marginHorizontal: 15,
      marginBottom: 25,
      borderRadius: 10,
      marginTop: 'auto',
    },
    btnText: {
      color: colors.white,
      fontSize: 17,
      letterSpacing: 0.8,
    },
    formInputCon: {
      height: 60,
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    formInputText: {
      fontSize: 13,
      letterSpacing: 0.5,
      opacity: 0.7,
      marginBottom: 5,
      paddingHorizontal: 6,
    },
    formInput: {
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: 8,
      color: darkTheme ? colors.darkWhite : colors.darkBlack,
      fontSize: 18,
      fontFamily: 'Nunito-Regular',
      borderColor: colors.darkGrey,
      borderWidth: 1.3,
      borderRadius: 5,
    },
  });

  const handleChange = () => {
    changeSettings('user', newName);
    goBack();
  };

  return (
    <BasicScreen>
      <View style={styles.topBar}>
        <AppButton textStyle={styles.back} onPress={goBack}>
          <Icon name="arrow-back" size={20} />
          Back
        </AppButton>
      </View>

      <View style={styles.body}>
        <AppText type="Bold" style={styles.title}>
          Change Name
        </AppText>

        <AppText style={styles.currentName}>
          Your current name is {settings.user}.
        </AppText>

        <View style={styles.formInputCon}>
          <AppText type="Bold" style={styles.formInputText}>
            New Name
          </AppText>
          <TextInput
            value={newName}
            style={styles.formInput}
            placeholder="Enter name"
            placeholderTextColor={
              darkTheme ? colors.darkWhite : colors.darkBlack
            }
            onChangeText={(text) => setNewName(text)}
          />
        </View>

        <AppButton
          type="SemiBold"
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={handleChange}>
          Change Name
        </AppButton>
      </View>
    </BasicScreen>
  );
};

export default ChangeName;
