import { ChangeEventHandler, MouseEventHandler } from "react";
import Button from "../Button";
import TextArea from "../TextArea";

interface writeTodoProps {
  value: string;
  onChangeTodo: ChangeEventHandler <HTMLTextAreaElement>;
  onClickSave: MouseEventHandler<HTMLButtonElement>;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
}

const WriteTodo = ({value, onChangeTodo, onClickSave, onClickCancel}: writeTodoProps) => {
  return (
    <>
      <div className="px-4">
        <TextArea value={value} onChange={onChangeTodo} placeHolder="write your to do"/>
      </div>
      <div className="flex justify-end gap-2 pr-2 mt-1 mb-2">
        <Button text="save" onClick={onClickSave} />
        <Button text="cancel" onClick={onClickCancel} />
      </div>
    </>
  )
}

export default WriteTodo;