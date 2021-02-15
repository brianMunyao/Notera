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

export {Todo, Config};
