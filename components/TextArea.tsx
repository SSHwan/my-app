import { ChangeEventHandler } from "react";

interface textAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeHolder?: string;
}

const TextArea = ({value, onChange, placeHolder = ''}: textAreaProps) => {
  return (
    <textarea
      className="py-1 px-2 border rounded-lg resize-none"
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      maxLength={100}
    />
  )
}

export default TextArea;