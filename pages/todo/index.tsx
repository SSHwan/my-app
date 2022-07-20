import React, { useReducer, useState } from "react";
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import WriteTodo from "../../components/todo/WriteTodo";
import TodoType from "../../interface/todo";
import todoReducer from "../../reducer/todo/todoReducer";
import TodoEnum from "../../enum/todoEnum";

const Todo: React.FunctionComponent = () => {
  const [todoText, setTodoText] = useState('');
  // const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todoList, todoDispatch] = useReducer(todoReducer, []);
  const [selectedId, setSelectedId] = useState(-1);
  const [updateText, setUpdateText] = useState('');
  const onClickSave = () => {
    if (todoText == '') return;
    todoDispatch({type: TodoEnum.ADD, payload: {content: todoText}});
    setTodoText('');
  };
  const onClickCancel = () => {
    setTodoText('');
  }
  const onChangeTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoText(e.target.value);
  };
  const onClickUpdate = (id: number) => {
    const selectedTodo = todoList.find((todo) => todo.id === id);
    const selectedContent = (selectedTodo ? selectedTodo.content : '') as string;
    setSelectedId(id);
    setUpdateText(selectedContent);
  };
  const onClickDelete = (id: number) => {
    todoDispatch({type: TodoEnum.DELETE, payload: {id}});
  };
  const onChangeUpdateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateText(e.target.value);
  };
  const onClickUpdateSave = (id: number) => {
    if (updateText == '') return;
    todoDispatch({type: TodoEnum.UPDATE, payload: {id, content: updateText}});
    setSelectedId(-1);
  };
  const onClickUpdateCancel = () => {
    setSelectedId(-1);
  };

  return (
    <>
      <div className="text-3xl">To Do List ({todoList.length})</div>
      <div className="font-bold mt-5">to do</div>
      <WriteTodo
        value={todoText}
        onChangeTodo={onChangeTodo}
        onClickSave={onClickSave}
        onClickCancel={onClickCancel}
      />
      <div className="mt-5">
        <ul className="flex flex-col gap-3">
          {
            todoList.map(({id, content}) => {
              return (
                <li
                  key={id}
                  className="border rounded-lg py-2"
                >
                  {
                    selectedId === id
                    ? (
                      <WriteTodo
                        value={updateText}
                        onChangeTodo={onChangeUpdateText}
                        onClickSave={() => onClickUpdateSave(id)}
                        onClickCancel={onClickUpdateCancel}
                      />
                    )
                    : <p className="whitespace-pre-wrap px-4">{content}</p>
                  }
                  <div className="flex justify-end gap-3 mr-2">
                    <PencilIcon onClick={() => onClickUpdate(id)} className="h-5 w-5 cursor-pointer"/>
                    <TrashIcon onClick={() => onClickDelete(id)} className="h-5 w-5 cursor-pointer"/>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
}

export default Todo;