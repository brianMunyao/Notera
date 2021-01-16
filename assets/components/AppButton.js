import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import AppText from './AppText';

const AppButton = ({children, type, style, textStyle, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style}>
        <AppText style={textStyle} type={type}>
          {children}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppButton;
