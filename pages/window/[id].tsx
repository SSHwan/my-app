import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import UpperWindowFrameForm from "../../components/window/frame/UpperWindowFrameForm";
import WindowEnum from "../../enum/windowEnum";
import FrameType from "../../interface/frame";
import WindowType from "../../interface/window";

interface Props {
  params: {
    id: string;
  }
}

const defaultInputs = {
  height: 0,
  width: 0,
  topHeight: 0
} as FrameType

const WindowDocument = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const data = JSON.parse(router.query.window as string);
  const [window, setWindow] = useState(data as WindowType); 
  const [frames, setFrames] = useState((window.frames ?? []) as Array<FrameType>);
  const [inputs, setInputs] = useState(defaultInputs);
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
  const getWindowCalc = (windowCalc as any)[window.windowType];
  const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const height = getOnlyNumber(e.target.value);
      const width = inputs.width;
      const topHeight = inputs.topHeight;
      return {
        ...inputs,
        height,
        ...getWindowCalc(height, width, topHeight)
      };
    });
  }
  const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const height = inputs.height;
      const width = getOnlyNumber(e.target.value);
      const topHeight = inputs.topHeight;
      return {
        ...inputs,
        width,
        ...getWindowCalc(height, width, topHeight)
      };
    });
  }
  const onChangeTopHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => {
      const height = inputs.height;
      const width = inputs.width;
      const topHeight = getOnlyNumber(e.target.value);
      return {
        ...inputs,
        topHeight,
        ...getWindowCalc(height, width, topHeight)
      };
    });
  }

  return (
    <>
      <div className="text-3xl">{window.title} ({(WindowEnum as any)[window.windowType]})</div>
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
            />,
          'FIXWINDOW': <></>,
          'WINDOW': <></>,
        }[window.windowType]
      }
      {/* <div>높이 : {inputs.height}</div>
      <div>넓이 : {inputs.width}</div>
      <div>윗 창 높이 : {inputs.topHeight}</div>
      <div>아래 창 높이 : {inputs.bottomHeight}</div>
      <div>901 : {inputs.type901}</div>
      <div>7.801 위 : {inputs.type7801_1}</div>
      <div>7.801 아래 : {inputs.type7801_2}</div>
      <div>4601 : {inputs.type4601}</div> */}
      <div>========================================</div>
      <div>
        {
          frames.map((frame, index) => (
            <div key={index}>
              <div>높이 : {frame.height}</div>
              <div>넓이 : {frame.width}</div>
              <div>윗 창 높이 : {frame.topHeight}</div>
              <div>아래 창 높이 : {frame.bottomHeight}</div>
              <div>901 : {frame.type901}</div>
              <div>7.801 위 : {frame.type7801_1}</div>
              <div>7.801 아래 : {frame.type7801_2}</div>
              <div>4601 : {frame.type4601}</div>
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

const getUpperWindowCalc = (height:number, width:number, topHeight:number) => {
  const bottomHeight = height - topHeight;
  const type901 = width - 40;
  const type7801_1 = topHeight - 27;
  const type7801_2 = bottomHeight - 97;
  const type4601 = (width - 192) / 2;
  return {
    bottomHeight,
    type901,
    type7801_1,
    type7801_2,
    type4601
  }
}

const getFixWindowCalc = (height:number, width:number, topHeight:number) => {
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

const getWindowCalc = (height:number, width:number) => {
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

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  return {
      props: { params }
  }
}

export default WindowDocument;