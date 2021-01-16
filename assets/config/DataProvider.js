import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Realm from 'realm';
import realm from './Schema';

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [settings, setSettings] = useState({});
  const darkTheme = settings.darkTheme === 'true';

  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [undoneTodos, setUndoneTodos] = useState([]);

  const [error, setError] = useState();

  // let realm = useRef(null);

  useEffect(() => {
    // initDB();
    getSettings();
    getTodos();
  }, [getTodos, getSettings]);

  // const initDB = useCallback(() => {
  //   realm.current = new Realm({
  //     path: 'Notera.realm',
  //     schema: [Todo, Config],
  //   });

  //   //initilize config
  //   const defaultConfig = [
  //     {key: 'user', value: ''},
  //     {key: 'notifications', value: 'false'},
  //     {key: 'darkTheme', value: 'false'},
  //   ];

  //   try {
  //     realm.current.write(() => {
  //       if (realm.current.objects('config').length === 0) {
  //         for (let i = 0; i < defaultConfig.length; i++) {
  //           realm.current.create('config', defaultConfig[i]);
  //         }
  //       }
  //     });
  //   } catch (e) {
  //     console.log('init', e);
  //   }
  // }, [Config, Todo]);

  const getSettings = useCallback(() => {
    try {
      const tempObj = {};
      realm.write(() => {
        const res = realm.objects('config');
        for (let i = 0; i < res.length; i++) {
          tempObj[res[i].key] = res[i].value;
        }

        setSettings(tempObj);
      });
    } catch (e) {
      console.log('getUserSettings', e);
    }
  }, []);

  const changeSettings = (setting, value) => {
    try {
      realm.write(() => {
        const res = realm.objects('config');
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
    } catch (e) {
      console.log('changeSettings', e);
    }
  };

  const saveName = (name) => {
    try {
      realm.write(() => {
        const dbSearch = realm.objects('config').filtered('key="user"');
        if (dbSearch.length > 0) {
          dbSearch[0].value = name;
        }
      });
      getSettings();
    } catch (e) {
      console.log('saveName', e);
    }
  };

  const getTodos = useCallback(() => {
    let tempTodos = [];
    try {
      tempTodos = realm.objects('todos').sorted('todo_id', true);
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
      res = realm.objects('todos').filtered('todo_id=' + id);
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

    realm.write(() => realm.create('todos', tempObj));
    getTodos();
  };

  const checkTodo = (obj) => {
    realm.write(() => {
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
    realm.write(() => {
      const dbSearch = searchById(id);

      if (dbSearch.length > 0) {
        realm.delete(realm.objects('todos').filtered('todo_id=' + id));
      }
    });

    getTodos();
  };
  const deleteData = () => {};

  return (
    <DataContext.Provider
      value={{
        darkTheme,
        settings,
        todos,
        doneTodos,
        undoneTodos,
        saveName,
        addTodo,
        updateTodo,
        checkTodo,
        deleteTodo,
        changeSettings,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
