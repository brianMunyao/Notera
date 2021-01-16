import React, {useContext, useState} from 'react';
import {
  FlatList,
  ScrollView,
  ScrollViewComponent,
  SectionList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {DataContext} from '../config/DataProvider';

import BasicScreen from '../components/BasicScreen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import CategoryCard from '../components/CategoryCard';
import AppButton from '../components/AppButton';
import TodoItem from '../components/TodoItem';
import Accordion from '../components/Accordion';
import SearchBar from '../components/SearchBar';
import ListSeparator from '../components/ListSeparator';
import ListEmpty from '../components/ListEmpty';
import ListFooter from '../components/ListFooter';

const HomeScreen = ({navigation: {navigate}}) => {
  const {
    settings,
    darkTheme,
    todos,
    doneTodos,
    undoneTodos,
    deleteTodo,
  } = useContext(DataContext);

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
  const styles = StyleSheet.create({
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      height: 45,
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

  const tasks = [
    {id: 0, item: 'Pay rent 0', done: true},
    {id: 1, item: 'Pay rent 1', done: true},
    {id: 2, item: 'Pay rent 2', done: false},
    {id: 3, item: 'Pay rent 3', done: false},
    {id: 4, item: 'Pay rent 4', done: false},
    {id: 5, item: 'Pay rent 5', done: false},
  ];
  const tasks2 = [
    {id: 0, item: 'Pay rent 0', done: true},
    {id: 1, item: 'Pay rent 1', done: true},
    {id: 2, item: 'Pay rent 2', done: false},
  ];
  const data = [
    {index: 0, title: 'Personal', items: tasks},
    {index: 1, title: 'Business', items: tasks2},
    {index: 2, title: 'School', items: tasks},
  ];

  const handleSearch = (txt) => {
    setSearchTerm(txt);
    navigate('SearchScreen', {value: txt});
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
          onPress={() => navigate('Settings')}
        />
      </View>

      <View style={styles.greetingCon}>
        <AppText type="Bold" style={styles.greeting}>
          {greeting},
        </AppText>
        <AppText type="Bold" style={styles.greeting}>
          {settings.user}
        </AppText>
      </View>

      {/* <View style={styles.categories}>
        <AppText style={styles.categoriesTitle} type="Bold">
          CATEGORIES
        </AppText>

        <ScrollView
          snapToInterval={200}
          contentContainerStyle={styles.categoriesList}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {data.map(({index, title, items}) => (
            <CategoryCard key={index} title={title} tasks={items} />
          ))}
        </ScrollView>
      </View> */}

      <View style={styles.tasks}>
        {/* <AppText type="Bold" style={styles.todosTitle}>
          MY TODOS
        </AppText> */}

        <FlatList
          data={undoneTodos}
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
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={
            <>
              <ListFooter h={50} />
              <Accordion
                navigate
                title="Done todos"
                dataList={doneTodos}
                isEmpty="No done todos"
              />
            </>
          }
        />

        <AppButton style={styles.addTask} onPress={() => navigate('AddTask')}>
          <Icon
            name="add-circle"
            size={65}
            color={darkTheme ? colors.white : colors.primary}
          />
        </AppButton>
      </View>
    </BasicScreen>
  );
};

export default HomeScreen;
