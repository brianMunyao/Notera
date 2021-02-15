import React, {useContext} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import AppText from '../components/AppText';
import BasicScreen from '../components/BasicScreen';
import SettingsItem from '../components/SettingsItem';
import colors from '../config/colors';

const SettingsScreen = ({navigation: {navigate}}) => {
  const {settings, changeSettings, deleteData} = useContext(DataContext);

  const styles = StyleSheet.create({
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 30,
      opacity: 0.7,
      paddingHorizontal: 15,
      paddingVertical: 5,
      letterSpacing: 1,
    },
    settings: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    settingCategory: {
      marginBottom: 10,
    },
    settingsTitle: {
      fontSize: 15,
    },
  });

  const handleSettings = (setting) => {
    if (setting === 'user') {
    } else {
      const sValue = settings[setting] === 'true';
      changeSettings(setting, String(!sValue));
    }
  };

  const settingsTitle = (title) => {
    return (
      <AppText style={styles.settingsTitle} type="Bold">
        {title}
      </AppText>
    );
  };

  return (
    <BasicScreen>
      <View style={styles.topBar}>
        <Icon
          name="arrow-back"
          size={30}
          color={colors.grey}
          onPress={() => navigate('HomeScreen')}
        />
        <AppText type="Bold" style={styles.title}>
          Settings
        </AppText>
      </View>

      <View style={styles.settings}>
        <View style={styles.settingCategory}>
          {settingsTitle('Option')}

          <SettingsItem
            icon="notifications-outline"
            title="Notifications"
            onPress={() => handleSettings('notifications')}>
            <Switch
              thumbColor={
                settings.notifications === 'true'
                  ? colors.primary
                  : colors.greyMid
              }
              value={settings.notifications === 'true'}
              onValueChange={() => handleSettings('notifications')}
            />
          </SettingsItem>

          <SettingsItem
            icon="moon-outline"
            title="Dark Theme"
            onPress={() => handleSettings('darkTheme')}>
            <Switch
              thumbColor={
                settings.darkTheme === 'true' ? colors.primary : colors.greyMid
              }
              value={settings.darkTheme === 'true'}
              onValueChange={() => handleSettings('darkTheme')}
            />
          </SettingsItem>
        </View>

        <View style={styles.settingCategory}>
          {settingsTitle('Data')}

          <SettingsItem
            icon="person-outline"
            title="Change Name"
            onPress={() => navigate('ChangeName')}
          />
          <SettingsItem
            icon="trash-outline"
            title="Delete Data"
            onPress={deleteData}
          />
        </View>
      </View>
    </BasicScreen>
  );
};

export default SettingsScreen;
