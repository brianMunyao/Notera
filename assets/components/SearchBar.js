import React, {useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import colors from '../config/colors';

const SearchBar = ({autoFocus, value, onPress, onChangeText}) => {
  const {darkTheme} = useContext(DataContext);

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: darkTheme ? colors.darkGrey : colors.greyMid,
      height: '100%',
      flex: 1,
      marginRight: 20,
      borderRadius: 25,
      overflow: 'hidden',
    },
    searchBarIcon: {
      position: 'absolute',
      top: '25%',
      left: 0,
      paddingHorizontal: 10,
      color: darkTheme ? colors.darkLevel0 : colors.grey,
    },
    searchBarInput: {
      position: 'absolute',
      left: 0,
      top: -1,
      paddingLeft: 40,
      paddingRight: 15,
      display: 'flex',
      width: '100%',
      fontSize: 20,
      fontFamily: 'Nunito-SemiBold',
      letterSpacing: 0.5,
    },
  });
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name="search" size={22} style={styles.searchBarIcon} />
        <TextInput
          autoFocus={autoFocus}
          value={value}
          placeholder="Search"
          style={styles.searchBarInput}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default SearchBar;
