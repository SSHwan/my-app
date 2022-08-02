import { TextField } from "@mui/material";
import { useRef } from "react";
import UpperWindowFrameType from "../../../interface/upperWindowFrame";

interface Props {
  submit: Function;
  inputs: UpperWindowFrameType;
  onChangeHeight: React.ChangeEventHandler<HTMLInputElement>;
  onChangeWidth: React.ChangeEventHandler<HTMLInputElement>;
  onChangeTopHeight: React.ChangeEventHandler<HTMLInputElement>;
  num: number;
}

const AddUpperWindowFrame = ({submit, inputs, num, onChangeHeight, onChangeWidth, onChangeTopHeight}: Props) => {
  const heightTextField = useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.height > 0 && inputs.width > 0 && inputs.topHeight > 0) {
      submit();
      (heightTextField.current as HTMLInputElement).focus();
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-3 gap-4">
      <div className="col-span-2 grid grid-cols-3">
        <div className="h-32">{num}</div>
        <div className="border-indigo-600 border-2 h-32"></div>
        <div className="border-indigo-600 border-b-2">
          <TextField
            autoFocus
            margin="dense"
            label="윗 창 높이"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.topHeight}
            onChange={onChangeTopHeight}
            inputProps={{ tabIndex: 3 }}
          />
        </div>

        <div className=""></div>
        <div className="border-indigo-600 border-x-2 h-1"></div>
        <div className=""></div>

        <div className="">
          <TextField
            autoFocus
            margin="dense"
            label="높이"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.height}
            onChange={onChangeHeight}
            inputProps={{ tabIndex: 1, ref: heightTextField }}
          />
        </div>
        <div className="border-indigo-600 border-2 h-48"></div>
        <div className="">
          {inputs.bottomHeight}
        </div>

        <div className="col-start-2">
          <TextField
            autoFocus
            margin="dense"
            label="넓이"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.width}
            onChange={onChangeWidth}
            inputProps={{ tabIndex: 2 }}
          />
        </div>
        {/* <TextField
          autoFocus
          margin="dense"
          label="높이"
          type="text"
          fullWidth
          variant="standard"
          value={inputs.height}
          onChange={onChangeHeight}
        />
        <TextField
          autoFocus
          margin="dense"
          label="넓이"
          type="text"
          fullWidth
          variant="standard"
          value={inputs.width}
          onChange={onChangeWidth}
        />
        <TextField
          autoFocus
          margin="dense"
          label="윗 창 높이"
          type="text"
          fullWidth
          variant="standard"
          value={inputs.topHeight}
          onChange={onChangeTopHeight}
        />
        <button type="submit">추가</button> */}
      </div>

      <div>
        {/* <div>높이 : {inputs.height}</div>
        <div>넓이 : {inputs.width}</div>
        <div>윗 창 높이 : {inputs.topHeight}</div>
        <div>아래 창 높이 : {inputs.bottomHeight}</div> */}
        <div>901 : {inputs.type901}</div>
        <div>7.801 : {inputs.type7801_1}</div>
        <div>7.801 : {inputs.type7801_2}</div>
        <div>4601 : {inputs.type4601}</div>
        <button type="submit" tabIndex={4}>추가</button>
      </div>
    </form>
  )
}

export default AddUpperWindowFrame;