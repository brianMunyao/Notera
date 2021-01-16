import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BasicScreen from '../components/BasicScreen';
import SearchBar from '../components/SearchBar';
import colors from '../config/colors';

const SearchScreen = ({navigation: {goBack}, route: {params}}) => {
  const [searchTerm, setSearchTerm] = useState(params.value);

  const styles = StyleSheet.create({
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 45,
    },
    backIcon: {
      paddingHorizontal: 10,
    },
  });

  return (
    <BasicScreen>
      <View style={styles.topBar}>
        <Icon
          name="arrow-back"
          size={22}
          color={colors.grey}
          onPress={goBack}
          style={styles.backIcon}
        />
        <SearchBar
          autoFocus
          value={searchTerm}
          onChangeText={(txt) => setSearchTerm(txt)}
        />
      </View>
    </BasicScreen>
  );
};

export default SearchScreen;
