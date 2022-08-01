import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  handleClose: any;
  title: string;
  submit: Function;
}

const ConfirmDialog = ({open, handleClose, title, submit}: ConfirmDialogProps) => {
  const submitRef = useRef(null);
  const onSubmit = () => {
    (submitRef.current as any).disabled = true;
    handleClose();
    submit();
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button ref={submitRef} onClick={onSubmit} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog;