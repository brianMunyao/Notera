import React from 'react';
import {StyleSheet, View} from 'react-native';

const ListFooter = ({h}) => {
  const styles = StyleSheet.create({
    footer: {height: h},
  });

  return <View style={styles.footer} />;
};

export default ListFooter;
