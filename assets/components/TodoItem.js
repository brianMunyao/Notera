import React, {useContext} from 'react';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';
import colors from '../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';

const TodoItem = ({data, onDoublePress, onDelete}) => {
  const {todo_text, todo_done} = data;
  const {checkTodo, darkTheme} = useContext(DataContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkTheme ? colors.darkDarkBlack : colors.white,
      height: 45,
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      position: 'relative',
      overflow: 'hidden',
      elevation: 3,
    },
    todoIcon: {
      position: 'absolute',
      opacity: todo_done ? 0.6 : 1,
      top: 0,
      left: 0,
      height: '100%',
      width: 45,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    todoTextCon: {
      position: 'absolute',
      top: 0,
      left: 45,
      right: 0,
      height: '100%',
      paddingRight: 6,
    },
    todoText: {
      opacity: todo_done ? 0.6 : 1,
      textDecorationLine: todo_done ? 'line-through' : 'none',
      fontSize: 16,
      lineHeight: 45,
      letterSpacing: 0.3,
    },
    delete: {
      width: 40,
      height: '100%',
      marginRight: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
    },
  });

  let lastPress = 0;
  const handleDoublePress = () => {
    let tempPress = new Date().getTime() - lastPress;
    if (tempPress < 200) {
      onDoublePress(data);
    }
    lastPress = new Date().getTime();
  };

  const iconName = todo_done ? 'checkmark-circle' : 'ellipse-outline';

  const renderRightActions = () => (
    <AppButton style={styles.delete} onPress={onDelete}>
      <Icon name="trash-outline" size={20} />
    </AppButton>
  );

  return (
    <Swipeable
      friction={2}
      renderRightActions={renderRightActions}
      overshootRight={false}>
      <TouchableWithoutFeedback onPress={handleDoublePress}>
        <View style={styles.container}>
          <AppButton style={styles.todoIcon} onPress={() => checkTodo(data)}>
            <Icon name={iconName} size={22} color={colors.grey} />
          </AppButton>
          <View style={styles.todoTextCon}>
            <AppText style={styles.todoText} type="SemiBold">
              {todo_text}
            </AppText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

export default TodoItem;
