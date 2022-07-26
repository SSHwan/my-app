import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useState } from "react";
import WindowEnum from "../../enum/windowEnum";

interface WindowDialogProps {
  open: boolean;
  handleClose: any;
  addWindow: Function
}

const defaultInputs = {
  title: '',
  windowType: ''
}

const WindowDialog = ({open, handleClose, addWindow}: WindowDialogProps) => {
  const [inputs, setInputs] = useState(defaultInputs);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      return {...inputs, title: e.target.value}
    });
  }
  const onChangeWindowType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      console.log(e.target.value);
      return {...inputs, windowType: e.target.value}
    });
  }
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addWindow(inputs);
    handleClose();
    setInputs(defaultInputs);
  }
  const disableSubmit = (inputs.title && inputs.windowType) ? false : true;
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={submit}>
          <DialogContent>
              <FormControl>
                <TextField
                  autoFocus
                  margin="dense"
                  label="제목"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={inputs.title}
                  onChange={onChangeTitle}
                />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="pt-3"
                  value={inputs.windowType ?? ''}
                  onChange={onChangeWindowType}
                >
                  {
                    Object.keys(WindowEnum).map((index) => (
                      <FormControlLabel value={index} key={index} control={<Radio />} label={(WindowEnum as any)[index]} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit" disabled={disableSubmit}>만들기</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default WindowDialog;