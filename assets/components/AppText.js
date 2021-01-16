import React, {useContext} from 'react';
import {Text} from 'react-native';

import {DataContext} from '../config/DataProvider';

import colors from '../config/colors';

const AppText = ({children, type, style}) => {
  const {darkTheme} = useContext(DataContext);

  const myFont = !type ? 'Nunito-Regular' : `Nunito-${type}`;
  return (
    <Text
      style={[
        {
          fontFamily: myFont,
          color: darkTheme ? colors.white : colors.darkLevel0,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default AppText;
