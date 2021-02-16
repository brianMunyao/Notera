import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {DataContext} from '../config/DataProvider';

import BasicScreen from '../components/BasicScreen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import TodoItem from '../components/TodoItem';
import Accordion from '../components/Accordion';
import SearchBar from '../components/SearchBar';
import ListSeparator from '../components/ListSeparator';
import ListEmpty from '../components/ListEmpty';
import ListFooter from '../components/ListFooter';

const HomeScreen = ({navigation: {navigate}}) => {
  const {settings, darkTheme, doneTodos, undoneTodos, deleteTodo} = useContext(
    DataContext,
  );

  const [searchTerm, setSearchTerm] = useState('');

  const currentTime = new Date().getHours();
  let greeting = '';
  if (currentTime < 12) {
    greeting = 'Good Morning';
  } else if (currentTime < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const handleSearch = (txt) => {
    setSearchTerm(txt);
    navigate('SearchScreen', {value: txt});
  };

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
    <BasicScreen style={styles.container}>
      <View style={styles.topBar}>
        <SearchBar
          value={searchTerm}
          onChangeText={handleSearch}
          onPress={() => console.log(2)}
        />

        <Icon
          name="settings-outline"
          size={25}
          color={colors.grey}
          style={styles.settingsIcon}
          onPress={() => navigate('Settings')}
        />
      </View>

      <View style={styles.tasks}>
        <FlatList
          data={undoneTodos}
          keyExtractor={({todo_id}) => todo_id.toString()}
          ListHeaderComponent={
            <View style={styles.greetingCon}>
              <AppText type="Bold" style={styles.greeting}>
                {greeting},
              </AppText>
              <AppText type="Bold" style={styles.greeting}>
                {settings.user}
              </AppText>
            </View>
          }
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
                onDelete={() => deleteTodo(item.todo_id)}
              />
            </Swipeable>
          )}
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={
            <>
              <ListFooter h={30} />
              {doneTodos.length !== 0 && (
                <Accordion
                  navigate
                  title="Done todos"
                  dataList={doneTodos}
                  isEmpty="No done todos"
                />
              )}
            </>
          }
        />

        <AppButton style={styles.addTask} onPress={() => navigate('AddTask')}>
          <Icon
            name="add-circle"
            size={65}
            color={darkTheme ? colors.darkGrey : colors.primary}
          />
        </AppButton>
      </View>
    </BasicScreen>
  );
};

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  settingsIcon: {
    marginLeft: 20,
  },
  greetingCon: {
    padding: 20,
    opacity: 0.75,
  },
  greeting: {
    fontSize: 30,
    paddingVertical: 1,
  },
  categoriesTitle: {
    fontSize: 13,
    opacity: 0.3,
    paddingHorizontal: 15,
    paddingBottom: 0,
    paddingTop: 10,
    letterSpacing: 0.8,
  },
  categoriesList: {
    height: 115,
    paddingVertical: 1,
    display: 'flex',
    alignItems: 'center',
  },
  tasks: {
    position: 'relative',
    flex: 1,
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
  todosTitle: {
    padding: 10,
    opacity: 0.7,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  addTask: {
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
  footer: {
    height: 10,
  },
});

export default HomeScreen;
