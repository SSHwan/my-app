import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UpperWindowFrameForm from "../../components/window/frame/UpperWindowFrameForm";
import WindowEnum from "../../enum/windowEnum";
import FrameType from "../../interface/frame";
import WindowType from "../../interface/window";

interface Props {
  params: {
    id: string;
  }
}

interface WindowCalcProps {
  frameCount: number;
  height: number;
  width: number;
  topHeight: number;
}

const WindowDocument = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const data = JSON.parse(router.query.window as string);
  const [window, setWindow] = useState(data as WindowType); 
  const [frames, setFrames] = useState((window.frames ?? []) as Array<FrameType>);
  const defaultInputs = {
    height: 0,
    width: 0,
    frameCount: 1,
    ...(initInputs as any)[window.windowType]
  };
  const [inputs, setInputs] = useState(defaultInputs as FrameType);
  const getWindowCalc = (windowCalc as any)[window.windowType];
  const isNormal = window.windowType === 'WINDOW';
  const addFrame = () => {
    fetch(`/api/window/${id}/frame`, {
      method: 'PATCH',
      body: JSON.stringify({
        _id: id,
        frames: [...frames, inputs]
      })
    })
    .then((response) => response.json())
    .then(({frames}) => setFrames(frames));
    setInputs(defaultInputs);
  }
  const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const height = getOnlyNumber(e.target.value);
      const {frameCount, width, topHeight } = inputs;
      return {
        ...inputs,
        height,
        ...getWindowCalc({frameCount, height, width, topHeight})
      };
    });
  }
  const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const width = getOnlyNumber(e.target.value);
      const {frameCount, height, topHeight } = inputs;
      return {
        ...inputs,
        width,
        ...getWindowCalc({frameCount, height, width, topHeight})
      };
    });
  }
  const onChangeTopHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const topHeight = getOnlyNumber(e.target.value);
      const {frameCount, height, width } = inputs;
      return {
        ...inputs,
        topHeight,
        ...getWindowCalc({frameCount, height, width, topHeight})
      };
    });
  }
  const onChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      let frameCount = getOnlyNumber(e.target.value);
      frameCount = frameCount < 1 ? 1 : frameCount;
      const {topHeight, height, width } = inputs;
      return {...inputs, ...getWindowCalc({frameCount, height, width, topHeight})};
    })
  }

  return (
    <>
      <div className="text-3xl mb-7">{window.title} ({(WindowEnum as any)[window.windowType]})</div>
      {
        {
          'UPPERWINDOW':
            <UpperWindowFrameForm 
              submit={addFrame}
              inputs={inputs}
              num={frames.length + 1}
              onChangeHeight={onChangeHeight}
              onChangeWidth={onChangeWidth}
              onChangeTopHeight={onChangeTopHeight}
              onChangeCount={onChangeCount}
            />,
          'FIXWINDOW': <></>,
          'WINDOW': <></>,
        }[window.windowType]
      }
      <div className="mt-12">
        {
          frames.map((frame, index) => (
            <div key={index}>
              <div>-------------------------------</div>
              <div>{index + 1}</div>
              <div>높이 : {frame.height}</div>
              <div>넓이 : {frame.width}</div>
              <div>윗 창 높이 : {frame.topHeight}</div>
              <div>아래 창 높이 : {frame.bottomHeight}</div>
              <div>901 : {frame.type901} * {frame.count901}</div>
              <div>7.801 위 : {frame.type7801_1} * {frame.count7801}</div>
              <div>7.801 아래 : {frame.type7801_2} * {frame.count7801}</div>
              <div>4601 : {frame.type4601} * {frame.count4601}</div>
              <div>-------------------------------</div>
            </div>
          ))
        }
      </div>
    </>
  )
}

const getOnlyNumber = (wordToChange: string): number => {
  return Number(wordToChange.replace(/\D/g, ''));
}

const defaultUpperWindowInputs = {
  topHeight: 0,
  bottomHeight: 0,
  count901: 1,
  count7801: 2,
  count4601: 4
}
const defaultFixWindowInputs = {
  topHeight: 0,
  bottomHeight: 0,
  count1101: 2,
  count3001: 2,
  count7801: 2,
  count4601: 2
}
const defaultWindowInputs = {
  count7801: 2,
  count4601: 2
}

const getUpperWindowCalc = ({frameCount, height, width, topHeight}: WindowCalcProps) => {
  const bottomHeight = height - topHeight;
  const type901 = width - 40;
  const type7801_1 = topHeight - 27;
  const type7801_2 = bottomHeight - 97;
  const type4601 = (width - 192) / 2;
  const count901 = frameCount * 1;
  const count7801 = frameCount * 2;
  const count4601 = frameCount * 4;
  return {
    bottomHeight,
    type901,
    type7801_1,
    type7801_2,
    type4601,
    frameCount,
    count901,
    count7801,
    count4601
  }
}

const getFixWindowCalc = (frameCount:number, height:number, width:number, topHeight:number) => {
  const bottomHeight = height - topHeight;
  const type1101 = width - 90;
  const type3001_1 = width;
  const type3001_2 = topHeight - 90;
  const type7801 = bottomHeight - 70;
  const type4601 = (width - 192) / 2;
  return {
    bottomHeight,
    type1101,
    type3001_1,
    type3001_2,
    type7801,
    type4601
  }
}

const getWindowCalc = (frameCount:number, height:number, width:number) => {
  const type7801 = height - 70;
  const type4601 = (width - 192) / 2;
  return {
    type7801,
    type4601
  }
}

const windowCalc = {
  'UPPERWINDOW': getUpperWindowCalc,
  'FIXWINDOW': getFixWindowCalc,
  'WINDOW': getWindowCalc
}

const initInputs = {
  'UPPERWINDOW': defaultUpperWindowInputs,
  'FIXWINDOW': defaultFixWindowInputs,
  'WINDOW': defaultWindowInputs
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  return {
      props: { params }
  }
}

export default WindowDocument;