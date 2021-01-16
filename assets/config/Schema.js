import Realm from 'realm';

const Todo = {
  name: 'todos',
  properties: {
    todo_id: 'int',
    todo_text: 'string',
    todo_done: 'bool',
  },
  primaryKey: 'todo_id',
};
const Config = {
  name: 'config',
  properties: {
    key: 'string',
    value: 'string',
  },
  primaryKey: 'key',
};

const realm = new Realm({
  path: 'Notera.realm',
  schema: [Todo, Config],
  schemaVersion: 1,
});

export default realm;
