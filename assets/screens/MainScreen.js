import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import AddTask from './AddTask';
import SettingsScreen from './SettingsScreen';

const MainScreen = () => {
  const Stack = createStackNavigator();
  const renderStack = () => {
    return (
      <Stack.Navigator mode="modal" screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    );
  };

  return renderStack();
};

export default MainScreen;
