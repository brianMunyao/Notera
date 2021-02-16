import React, {useContext} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {DataContext} from '../config/DataProvider';

const BasicScreen = ({children, bar, style}) => {
  const {darkTheme} = useContext(DataContext);

  const myStyles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex: 1,
    },
  });
  return (
    <SafeAreaView style={[myStyles.container, {...style}]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};

export default BasicScreen;
