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

const Accordion = ({title, isEmpty, dataList, navigate}) => {
  const [expanded, setExpanded] = useState(true);
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
  });

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
          bounces
          data={dataList}
          keyExtractor={({todo_id}) => todo_id.toString()}
          renderItem={({item}) => (
            <TodoItem
              data={item}
              onDoublePress={() =>
                navigate('AddTask', {todo: JSON.stringify(item)})
              }
              onDelete={() => deleteTodo(item.todo_id)}
            />
          )}
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={<ListEmpty text={isEmpty} />}
          ListFooterComponent={<ListFooter h={100} />}
        />
      )}
    </View>
  );
};

export default Accordion;
