import TodoType from "../../interface/todo";
import TodoEnum from "../../enum/todoEnum";

interface TodoAction {
  type: TodoEnum;
  payload: {
    id?: number,
    content?: string,
    list?: TodoType[]
  };
}

const todoReducer = (todoList: TodoType[], action: TodoAction) => {
  const { type, payload } = action;
  switch (type) {
    case TodoEnum.INIT:
      return payload.list as TodoType[];

    case TodoEnum.ADD:
      const todo = {
        id: payload.id,
        content: payload.content
      } as TodoType;
      return [todo, ...todoList];

    case TodoEnum.UPDATE:
      return (
        todoList.map((todo) => {
          if (todo.id === payload.id) todo.content = payload.content;
          return todo;
        })
      );

    case TodoEnum.DELETE:
      return todoList.filter((todo) => todo.id !== payload.id);
  
    default:
      throw new Error('Unhandled action');
  }
}

export default todoReducer;