import React, {useContext} from 'react';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import colors from '../config/colors';
import AppText from './AppText';

const SettingsItem = ({title, icon, children, onPress}) => {
  const {darkTheme} = useContext(DataContext);

  const styles = StyleSheet.create({
    container: {
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 15,
      marginRight: 'auto',
      marginLeft: 10,
      color: darkTheme ? colors.darkWhite : colors.darkBlack,
    },
    icon: {
      opacity: 0.8,
      color: darkTheme ? colors.darkWhite : colors.darkBlack,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name={icon} size={19} style={styles.icon} />
        <AppText style={styles.text}>{title}</AppText>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingsItem;
