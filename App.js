import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {DataProvider} from './assets/config/DataProvider';
import MainApp from './assets/screens/MainApp';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
};

export default App;
