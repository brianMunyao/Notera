import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, ToastAndroid, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import BasicScreen from '../components/BasicScreen';
import colors from '../config/colors';

const AddTask = ({navigation: {navigate}, route: {params}}) => {
  let tempObj = {},
    tempTodo = '';

  try {
    tempObj = JSON.parse(params.todo);
    tempTodo = tempObj.todo_text;
  } catch (e) {
    tempObj = {};
    tempTodo = '';
  }

  const [newTask, setNewTask] = useState(tempTodo);
  const {addTodo, updateTodo, darkTheme} = useContext(DataContext);

  const handleSave = () => {
    if (tempObj.todo_text) {
      //update
      updateTodo(JSON.stringify({...tempObj, todo_text: newTask}));
      ToastAndroid.show('Todo updated', ToastAndroid.SHORT);
    } else {
      //new
      const task = newTask.trim();
      if (task !== '') {
        addTodo(task);
      }
      ToastAndroid.show('Todo Added', ToastAndroid.SHORT);
    }
    navigate('HomeScreen');
  };

  const styles = StyleSheet.create({
    todoInput: {
      width: '100%',
      height: 250,
      fontFamily: 'Nunito-SemiBold',
      fontSize: 23,
      paddingHorizontal: 15,
      letterSpacing: 0.5,
      color: darkTheme ? colors.darkWhite : colors.darkBlack,
    },
    btns: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 50,
      marginVertical: 20,
    },
    closeBtn: {
      paddingHorizontal: 5,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: '100%',
      borderRadius: 30,
      marginLeft: 20,
      backgroundColor: colors.primary,
    },
    saveBtnText: {
      color: colors.white,
      fontSize: 22,
      letterSpacing: 1,
    },
    spacer: {
      flex: 1,
    },
  });

  return (
    <BasicScreen style={styles.container}>
      <TextInput
        autoFocus
        multiline
        secureTextEntry
        value={newTask}
        style={styles.todoInput}
        placeholder="Enter new task"
        placeholderTextColor={darkTheme ? colors.darkWhite : colors.darkBlack}
        textAlignVertical="bottom"
        onChangeText={(text) => setNewTask(text)}
      />

      <View style={styles.spacer} />

      <View style={styles.btns}>
        <AppButton
          style={styles.closeBtn}
          onPress={() => navigate('HomeScreen')}>
          <Icon name="close-circle-outline" size={45} />
        </AppButton>

        <AppButton style={styles.saveBtn} onPress={handleSave}>
          <Icon name="checkmark" size={22} color={colors.white} />
          <AppText type="Bold" style={styles.saveBtnText}>
            Add Task
          </AppText>
        </AppButton>
      </View>
    </BasicScreen>
  );
};

export default AddTask;
