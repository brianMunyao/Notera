import React from 'react';
import {StyleSheet, View} from 'react-native';

const ListSeparator = () => {
  const styles = StyleSheet.create({
    separator: {
      height: 8,
    },
  });

  return <View style={styles.separator} />;
};

export default ListSeparator;
