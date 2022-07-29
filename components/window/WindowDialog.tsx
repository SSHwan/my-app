import { Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";
import WindowEnum from "../../enum/windowEnum";
import WindowType from "../../interface/window";

interface WindowDialogProps {
  open: boolean;
  handleClose: any;
  submit: Function,
  inputs: WindowType;
  onChangeTitle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeWindowType: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  isUpdate: boolean;
}

const WindowDialog = ({open, handleClose, submit, inputs, onChangeTitle, onChangeWindowType, isUpdate}: WindowDialogProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(inputs);
    handleClose();
  }
  const disableSubmit = (inputs.title && inputs.windowType) ? false : true;
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
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
                      <FormControlLabel value={index} key={index} control={<Radio />} label={(WindowEnum as any)[index]} disabled={isUpdate} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit" disabled={disableSubmit}>
              { isUpdate ? '수정' : '만들기' }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default WindowDialog;