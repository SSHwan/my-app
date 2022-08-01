import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WindowDialog from "../../components/window/WindowDialog";
import WindowType from "../../interface/window";
import WindowList from "../../components/window/WindowList";
import ConfirmDialog from "../../components/window/ConfirmDialog";

interface Inputs {
  height: string;
  width: string;
  topHeight: string;
}

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
    console.log('update > ', _id, title);
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
  // const addFrame = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('inputs >> ', inputs);
  //   const height = Number(inputs.height);
  //   const width = Number(inputs.width);
  //   const topHeight = Number(inputs.topHeight);
  //   const bottomHeight = height - topHeight;
  //   const type901 = width - 40;
  //   const type7801_1 = topHeight - 27;
  //   const type7801_2 = bottomHeight - 97;
  //   const type4601 = (width - 192) / 2;
  // }
  // const [inputs, setInputs] = useState({
  //   height: '',
  //   width: '',
  //   topHeight: ''
  // } as Inputs);
  // const {height, width, topHeight} = inputs;
  // const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs((inputs) => {
  //     return {
  //       ...inputs,
  //       height: getOnlyNumber(e.target.value)
  //     };
  //   });
  // }
  // const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs((inputs) => {
  //     return {
  //       ...inputs,
  //       width: getOnlyNumber(e.target.value)
  //     };
  //   });
  // }
  // const onChangeTopHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs((inputs) => {
  //     return {
  //       ...inputs,
  //       topHeight: getOnlyNumber(e.target.value)
  //     };
  //   });
  // }
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
      {/* <div>상하 창문</div>
      <div>높이</div>
      <div>넓이</div>
      <div>상 높이</div>
      <form onSubmit={addFrame}>
        <label htmlFor="height">높이</label>
        <input type="text" name="height" id="height" value={height} onChange={onChangeHeight}/>
        <label htmlFor="width">넓이</label>
        <input type="text" name="width" id="width" value={width} onChange={onChangeWidth}/>
        <label htmlFor="top_height">윗 창 높이</label>
        <input type="text" name="top_height" id="top_height" value={topHeight} onChange={onChangeTopHeight}/>
        <button type="submit">추가</button>
      </form>
      <div>901</div>
      <div>7.801</div>
      <div>901</div>
      <div>상하 픽스</div>
      <div>창문</div> */}
    </>
  );
}

// const getOnlyNumber = (wordToChange: string): string => {
//   return wordToChange.replace(/\D/g, '');
// }

export default Window;
