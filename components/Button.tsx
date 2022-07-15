import { MouseEventHandler } from "react";

interface buttonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({text, onClick}: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className="border font-bold rounded-lg px-2 py-1 w-fit hover:bg-slate-200"
    >
      {text}
    </button>
  )
}

export default Button;