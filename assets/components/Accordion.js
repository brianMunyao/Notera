import React, {useContext, useState} from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  UIManager,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import ListEmpty from './ListEmpty';
import ListFooter from './ListFooter';
import ListSeparator from './ListSeparator';
import AppText from './AppText';
import colors from '../config/colors';
import TodoItem from './TodoItem';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppButton from './AppButton';

const Accordion = ({title, isEmpty, dataList, navigate}) => {
  const [expanded, setExpanded] = useState(false);
  const {deleteTodo, darkTheme} = useContext(DataContext);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkTheme ? colors.darkLevel1 : colors.greyMid,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 5,
      opacity: 0.7,
    },
    title: {
      paddingHorizontal: 5,
      paddingVertical: 2,
      letterSpacing: 0.5,
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

  let row = [];
  let prevSwiped;
  const closeRow = (index) => {
    try {
      if (prevSwiped && prevSwiped !== row[index]) {
        prevSwiped.close();
      }
    } catch (e) {}
    prevSwiped = row[index];
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <AppText type="Bold" style={styles.title}>
            {title}
          </AppText>

          <Icon
            name={expanded ? 'caret-up' : 'caret-down-outline'}
            size={25}
            color={colors.grey}
          />
        </View>
      </TouchableWithoutFeedback>

      {expanded && (
        <FlatList
          data={dataList}
          keyExtractor={({todo_id}) => todo_id.toString()}
          renderItem={({index, item}) => (
            <Swipeable
              ref={(ref) => (row[index] = ref)}
              friction={4}
              onSwipeableRightWillOpen={() => closeRow(index)}
              onSwipeableRightOpen={() =>
                setTimeout(() => {
                  try {
                    row[index].close();
                  } catch (e) {}
                }, 2000)
              }
              renderRightActions={() => (
                <AppButton
                  style={styles.delete}
                  onPress={() => deleteTodo(item.todo_id)}>
                  <Icon name="trash-outline" size={20} />
                </AppButton>
              )}
              overshootRight={false}>
              <TodoItem
                data={item}
                onDoublePress={() =>
                  navigate('AddTask', {todo: JSON.stringify(item)})
                }
              />
            </Swipeable>
          )}
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={<ListEmpty text={isEmpty} />}
          ListFooterComponent={<ListFooter h={10} />}
        />
      )}
    </View>
  );
};

export default Accordion;
