import React, {useContext} from 'react';
import {View} from 'react-native';

import {DataContext} from '../config/DataProvider';
import MainScreen from './MainScreen';
import WelcomeScreen from './WelcomeScreen';

const MainApp = () => {
  const {authToken} = useContext(DataContext);

  if (!authToken) {
    return <WelcomeScreen />;
  }
  return <MainScreen />;
};

export default MainApp;
