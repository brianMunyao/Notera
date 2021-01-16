import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';

const CategoryCard = ({tasks, title}) => {
  const [stats, setStats] = useState({total: 0, done: 0});
  const totalDone = (stats.done / stats.total) * 100 + '%';

  useEffect(() => {
    const tempDone = tasks.filter((task) => task.done === true);
    setStats({total: tasks.length, done: tempDone.length});
  }, [tasks, setStats]);

  const styles = StyleSheet.create({
    container: {
      height: '90%',
      marginVertical: '5%',
      width: 180,
      backgroundColor: colors.white,
      marginHorizontal: 10,
      paddingTop: 20,
      paddingHorizontal: 12,
      paddingBottom: 12,
      borderRadius: 12,
      elevation: 6,
    },
    taskNum: {
      color: colors.grey,
      opacity: 0.9,
    },
    title: {
      fontSize: 18,
      letterSpacing: 0.7,
    },
    slide: {
      backgroundColor: colors.greyMid,
      width: '100%',
      height: 6,
      borderRadius: 10,
      marginTop: 'auto',
    },
    slideDone: {
      width: totalDone,
      height: 6,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => console.log(title)}>
      <View style={styles.container}>
        <AppText type="SemiBold" style={styles.taskNum}>
          {tasks.length} tasks
        </AppText>
        <AppText type="SemiBold" style={styles.title}>
          {title}
        </AppText>

        <View style={styles.slide}>
          <View style={styles.slideDone} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryCard;
