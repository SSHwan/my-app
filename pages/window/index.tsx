import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WindowDialog from "../../components/window/WindowDialog";
import WindowType from "../../interface/window";
import WindowList from "../../components/window/WindowList";
import ConfirmDialog from "../../components/window/ConfirmDialog";

interface DialogProps {
  open: boolean;
  submit: Function;
  isUpdate: boolean;
  existData: WindowType | null;
}

const defaultInputs: WindowType = {
  _id: '',
  title: '',
  windowType: ''
}

const Window = () => {
  const [inputs, setInputs] = useState(defaultInputs);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      return {...inputs, title: e.target.value}
    });
  }
  const onChangeWindowType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      return {...inputs, windowType: e.target.value}
    });
  }
  const [dialogProps, setDialogProps] = useState({open: false} as DialogProps);
  const onClickNew = () => {
    setInputs(defaultInputs);
    setDialogProps({open: true, submit: addWindow, isUpdate: false, existData: null});
  }
  const onClickUpdate = (window: WindowType) => {
    setInputs(window);
    setDialogProps({open: true, submit: updateWindow, isUpdate: true, existData: window});
  }
  const handleClose = () => {
    setDialogProps((props) => {
      return {...props, open: false}
    });
  }
  const onClickDelete = (_id: string) => {
    setConfirmProps({open: true, id: _id});
  }
  const [confirmProps, setConfirmProps] = useState({open: false, id: ''});
  const handleConfirmClose = () => {
    setConfirmProps((props) => {
      return {...props, open: false}
    });
  }
  const onSubmitDelete = () => {
    fetch('/api/window', {
      method: 'DELETE',
      body: JSON.stringify({
        _id: confirmProps.id,
        deletedDate: new Date()
      })
    })
    .then((response) => response.json())
    .then((data) => setWindows(data));
  }
  const [windows, setWindows] = useState([]);
  useEffect(() => {
    fetch('/api/window')
    .then((response) => response.json())
    .then((data) => setWindows(data));
  }, []);
  const addWindow = ({title, windowType}: WindowType) => {
    fetch('/api/window', {
      method: 'POST',
      body: JSON.stringify({
        title,
        windowType,
        createdDate: new Date()
      })
    })
    .then((response) => response.json())
    .then((data) => setWindows(data));
  }
  const updateWindow = ({_id, title}: WindowType) => {
    fetch('api/window', {
      method: 'PATCH',
      body: JSON.stringify({
        _id,
        title,
        updatedDate: new Date()
      })
    })
    .then((response) => response.json())
    .then((data) => setWindows(data));
  }

  return (
    <>
      <div className="flex justify-end mb-7">
        <Button variant="outlined" startIcon={<AddCircleOutlineIcon/>} onClick={onClickNew}>새로 만들기</Button>
      </div>
      <WindowDialog
        open={dialogProps.open}
        handleClose={handleClose}
        submit={dialogProps.submit}
        inputs={inputs}
        onChangeTitle={onChangeTitle}
        onChangeWindowType={onChangeWindowType}
        isUpdate={dialogProps.isUpdate}
      />
      <ConfirmDialog
        open={confirmProps.open}
        handleClose={handleConfirmClose}
        title="삭제하시겠습니까?"
        submit={onSubmitDelete}
      />
      <WindowList
        windows={windows}
        onClickUpdate={onClickUpdate}
        onClickDelete={onClickDelete}
      />
    </>
  );
}

export default Window;
