import React from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';

const BasicScreen = ({children, style}) => {
  const topPad = Platform.OS === 'android' ? 40 : 0;

  return (
    <SafeAreaView style={{paddingTop: topPad, ...style}}>
      <StatusBar translucent backgroundColor="transparent" />
      {children}
    </SafeAreaView>
  );
};

export default BasicScreen;
