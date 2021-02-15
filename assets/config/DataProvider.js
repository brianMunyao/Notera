import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {DevSettings} from 'react-native';
import Realm from 'realm';
import {Config, Todo} from './Schema';

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [settings, setSettings] = useState({});
  const darkTheme = settings.darkTheme === 'true';

  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [undoneTodos, setUndoneTodos] = useState([]);

  const [error, setError] = useState();

  let realm = useRef(null);

  //initilize config
  const defaultConfig = [
    {key: 'user', value: ''},
    {key: 'notifications', value: 'false'},
    {key: 'darkTheme', value: 'false'},
  ];

  useEffect(() => {
    initDB();
    getTodos();
  }, [initDB, getTodos]);

  const initDB = useCallback(() => {
    realm.current = new Realm({
      path: 'Notera.realm',
      schema: [Todo, Config],
    });

    const _realm = realm.current;
    try {
      _realm.write(() => {
        if (_realm.objects('config').length === 0) {
          for (let i = 0; i < defaultConfig.length; i++) {
            _realm.create('config', defaultConfig[i]);
          }
        }
      });

      const tempSettings = {};
      _realm.write(() => {
        const res = _realm.objects('config');
        for (let i = 0; i < res.length; i++) {
          tempSettings[res[i].key] = res[i].value;
        }
        setSettings(tempSettings);
      });
    } catch (e) {}
  }, [defaultConfig]);

  const changeSettings = (setting, value) => {
    try {
      const _realm = realm.current;
      _realm.write(() => {
        const res = _realm.objects('config');
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].key === setting) {
              res[i].value = value;

              const tempObj = {};
              for (let j = 0; j < res.length; j++) {
                tempObj[res[j].key] = res[j].value;
              }
              setSettings(tempObj); //  TODO -> improve this afterwards
            }
          }
        }
      });
    } catch (e) {}
  };

  const getTodos = useCallback(() => {
    let tempTodos = [];
    try {
      tempTodos = realm.current.objects('todos').sorted('todo_id', true);
    } catch (e) {
      console.log(e);
    }
    const tempDone = tempTodos.filter((obj) => obj.todo_done === true);
    const tempUndone = tempTodos.filter((obj) => obj.todo_done === false);

    setDoneTodos(tempDone);
    setUndoneTodos(tempUndone);

    setTodos(tempTodos);
  }, []);

  const searchById = (id) => {
    let res = [];
    try {
      res = realm.current.objects('todos').filtered('todo_id=' + id);
    } catch (e) {
      res = [];
    }
    return res;
  };

  const addTodo = (text) => {
    const tempTodos = [...todos].reverse();

    const tempObj = {
      todo_id:
        tempTodos.length !== 0
          ? tempTodos[tempTodos.length - 1].todo_id + 1
          : 1,
      todo_text: text,
      todo_done: false,
    };

    realm.current.write(() => realm.current.create('todos', tempObj));
    getTodos();
  };

  const checkTodo = (obj) => {
    realm.current.write(() => {
      const dbSearch = searchById(obj.todo_id);

      if (dbSearch.length > 0) {
        dbSearch[0].todo_done = dbSearch[0].todo_done ? false : true;
      }
    });
    getTodos();
  };

  const updateTodo = (todo) => {
    const tempTodo = JSON.parse(todo);

    realm.current.write(() => {
      const dbSearch = searchById(tempTodo.todo_id);

      if (dbSearch.length > 0) {
        dbSearch[0].todo_text = tempTodo.todo_text;
      }
    });
    getTodos();
  };

  const deleteTodo = (id) => {
    const _realm = realm.current;
    _realm.write(() => {
      const dbSearch = searchById(id);

      if (dbSearch.length > 0) {
        _realm.delete(_realm.objects('todos').filtered('todo_id=' + id));
      }
    });

    getTodos();
  };
  const deleteData = () => {
    const _realm = realm.current;
    try {
      const tempTodos = _realm.objects('todos');
      const tempConfig = _realm.objects('config');

      _realm.write(() => {
        _realm.delete(tempTodos);
        _realm.delete(tempConfig);
      });
      DevSettings.reload();
    } catch (e) {}
  };

  return (
    <DataContext.Provider
      value={{
        darkTheme,
        settings,
        todos,
        doneTodos,
        undoneTodos,
        addTodo,
        updateTodo,
        checkTodo,
        deleteTodo,
        changeSettings,
        deleteData,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
