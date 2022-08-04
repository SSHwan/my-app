import { AddOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import UpperWindowFrameType from "../../../interface/upperWindowFrame";

interface Props {
  submit: Function;
  inputs: UpperWindowFrameType;
  onChangeHeight: React.ChangeEventHandler<HTMLInputElement>;
  onChangeWidth: React.ChangeEventHandler<HTMLInputElement>;
  onChangeTopHeight: React.ChangeEventHandler<HTMLInputElement>;
  onChangeCount: React.ChangeEventHandler<HTMLInputElement>;
  num: number;
}

const AddUpperWindowFrame = ({submit, inputs, num, onChangeHeight, onChangeWidth, onChangeTopHeight, onChangeCount}: Props) => {
  const heightTextField = useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.height > 0 && inputs.width > 0 && inputs.topHeight > 0) {
      submit();
      (heightTextField.current as HTMLInputElement).focus();
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
      <div className="grid grid-cols-3">
        <div className="h-32 flex justify-end mr-20 pt-5 text-4xl">{num}</div>
        <div className="border-indigo-600 border-2 h-32"></div>
        <div className="border-indigo-600 border-b-2">
          <TextField
            className="ml-6 w-24"
            margin="dense"
            label="윗 창 높이"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.topHeight}
            onChange={onChangeTopHeight}
            inputProps={{ tabIndex: 3, maxLength: 5, style: { fontSize: 30 } }}
          />
        </div>
        <div className="col-start-2 border-indigo-600 border-x-2 h-1"></div>
        <div className="col-start-1 flex justify-end">
          <TextField
            className="mr-6 w-24"
            autoFocus
            margin="dense"
            label="높이"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.height}
            onChange={onChangeHeight}
            inputProps={{ tabIndex: 1, ref: heightTextField, maxLength: 5, style: { fontSize: 30 } }}
          />
        </div>
        <div className="border-indigo-600 border-2 h-48"></div>
        <div className="text-4xl ml-10 mt-8">
          {inputs.bottomHeight}
        </div>
        <div className="col-start-2 flex justify-center">
          <TextField
            className="w-24"
            margin="dense"
            label="넓이"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.width}
            onChange={onChangeWidth}
            inputProps={{ tabIndex: 2, maxLength: 5, style: { fontSize: 30 } }}
          />
        </div>
      </div>

      <div className="text-4xl grid grid-rows-4 gap-3">
        <div className="flex items-center">
          <div className="flex-1 text-right">901 :</div>
          <div className="flex-1 justify-end flex gap-2">
            { inputs.type901 && (<>
              <div className="text-right">{inputs.type901}</div>
              <div>*</div>
              <div>{inputs.count901}</div>
            </>)}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-1 text-right">7.801 :</div>
          <div className="flex-1 justify-end flex gap-2">
            { inputs.type7801_1 && (<>
              <div className="text-right">{inputs.type7801_1}</div>
              <div>*</div>
              <div>{inputs.count7801}</div>
            </>)}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-1 text-right"></div>
          <div className="flex-1 justify-end flex gap-2">
            { inputs.type7801_2 && (<>
              <div className="text-right">{inputs.type7801_2}</div>
              <div>*</div>
              <div>{inputs.count7801}</div>
            </>)}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-1 text-right">4601 :</div>
          <div className="flex-1 justify-end flex gap-2">
            { inputs.type4601 && (<>
              <div className="text-right">{inputs.type4601}</div>
              <div>*</div>
              <div>{inputs.count4601}</div>
            </>)}
          </div>
        </div>
        <div className="flex items-end">
          <div className="flex-1 text-right">
            <input className="w-16 text-right" type="number" value={inputs.frameCount} onChange={onChangeCount} maxLength={2}/>
            <label>틀</label>
          </div>
          <div className="flex-1 flex justify-end items-end">
            <Button variant="outlined" size="large" startIcon={<AddOutlined/>} type="submit" tabIndex={4}>추가</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddUpperWindowFrame;