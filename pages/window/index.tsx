import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WindowDialog from "../../components/window/WindowDialog";
import WindowType from "../../interface/window";
import WindowList from "../../components/window/WindowList";

interface Inputs {
  height: string;
  width: string;
  topHeight: string;
}

const Window = () => {
  const [open, setOpen] = useState(false);
  const onClickNew = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const [windows, setWindows] = useState([]);
  useEffect(() => {
    fetch('/api/window')
    .then((response) => response.json())
    .then((data) => setWindows(data));
  }, []);
  const addWindow = (window: WindowType) => {
    window.createdDate = new Date();
    fetch('/api/window', {
      method:'POST',
      body: JSON.stringify(window)
    })
    .then((response) => response.json())
    .then((data) => setWindows(data));
  }
  const addFrame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('inputs >> ', inputs);
    const height = Number(inputs.height);
    const width = Number(inputs.width);
    const topHeight = Number(inputs.topHeight);
    const bottomHeight = height - topHeight;
    const type901 = width - 40;
    const type7801_1 = topHeight - 27;
    const type7801_2 = bottomHeight - 97;
    const type4601 = (width - 192) / 2;
  }
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
      <WindowDialog open={open} handleClose={handleClose} addWindow={addWindow} />
      <WindowList windows={windows} />
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
