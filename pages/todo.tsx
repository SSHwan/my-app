import React, { useState } from "react";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

interface todo {
  id: number;
  content: string;
}

const defaultTodo = {
  id: 0,
  content: '아에이오우~영우~!'
}

const Todo: React.FunctionComponent = () => {
  const [todoText, setTodoText] = useState('');
  const [todoList, setTodoList] = useState<todo[]>([defaultTodo]);
  const [selectedId, setSelectedId] = useState(-1);
  const [updateText, setUpdateText] = useState('');
  const onClickSave = () => {
    if (todoText == '') return;
    setTodoList((todoList) => {
        const id = todoList.length > 0 ? todoList[0].id + 1 : 0;
        const todo = {
          id, 
          content: todoText
        }
        return [todo, ...todoList];
      }
    );
    setTodoText('');
  };
  const onChangeTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoText(e.target.value);
  };
  const onClickUpdate = (id: number) => {
    const selectedTodo = todoList.find((todo) => todo.id === id);
    const selectedContent = selectedTodo ? selectedTodo.content : '';
    console.log(id, selectedTodo, selectedContent);
    setSelectedId(id);
    setUpdateText(selectedContent);
  };
  const onClickDelete = (id: number) => {

  };
  const onChangeUpdateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateText(e.target.value);
  };
  console.log(todoList);
  return (
    <>
      <h1 className="text-3xl">To Do List ({todoList.length})</h1>
      <label htmlFor="todo_text" className="font-bold mt-5">to do</label>
      <div className="px-4">
        <TextArea value={todoText} onChange={onChangeTodo} placeHolder="write your to do"/>
      </div>
      <div className="flex justify-end mt-1">
        <Button text="save" onClick={onClickSave} />
      </div>
      <div className="mt-5">
        <ul className="flex flex-col gap-3">
          {
            todoList.map(({id, content}) => {
              return (
                <li
                  key={id}
                  className="border rounded-lg py-2 px-4"
                >
                  {
                    selectedId === id
                    ? <TextArea value={updateText} onChange={onChangeUpdateText}/>
                    : <p className="whitespace-pre-wrap">{content}</p>
                  }
                  <div className="flex justify-end gap-3">
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