import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';

const ListEmpty = ({text}) => {
  const styles = StyleSheet.create({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    emptyText: {
      fontSize: 16,
      opacity: 0.4,
      letterSpacing: 0.5,
    },
  });

  return (
    <View style={styles.empty}>
      <AppText style={styles.emptyText} type="SemiBold">
        {text ? text : 'You have no todos'}
      </AppText>
    </View>
  );
};

export default ListEmpty;
