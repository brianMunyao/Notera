import React, {useContext} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DataContext} from '../config/DataProvider';

import MainScreen from './MainScreen';
import NewUserScreen from './NewUserScreen';
import colors from '../config/colors';
import NameScreen from './NameScreen';
import ChangeName from './ChangeName';
import SearchScreen from './SearchScreen';

const MainApp = () => {
  const NewUserStack = createStackNavigator();
  const renderNewUserStack = () => {
    return (
      <NewUserStack.Navigator mode="card" screenOptions={{headerShown: false}}>
        <NewUserStack.Screen name="NewUser" component={NewUserScreen} />
        <NewUserStack.Screen name="NameScreen" component={NameScreen} />
      </NewUserStack.Navigator>
    );
  };

  const RegularStack = createStackNavigator();
  const renderRegularStack = () => {
    return (
      <RegularStack.Navigator mode="card" screenOptions={{headerShown: false}}>
        <RegularStack.Screen name="MainScreen" component={MainScreen} />
        <RegularStack.Screen name="SearchScreen" component={SearchScreen} />
        <RegularStack.Screen name="ChangeName" component={ChangeName} />
      </RegularStack.Navigator>
    );
  };

  const {settings, darkTheme} = useContext(DataContext);

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: darkTheme ? colors.darkLevel0 : colors.greyLight,
    },
  };

  return (
    <NavigationContainer theme={myTheme}>
      {settings.user === '' ? renderNewUserStack() : renderRegularStack()}
    </NavigationContainer>
  );
};

export default MainApp;
