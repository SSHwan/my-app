import FixWindowFrameType from "./fixWindowFrame";
import UpperWindowFrameType from "./upperWindowFrame";
import WindowFrameType from "./windowFrame";

export default interface WindowType {
  _id?: string;
  title: string;
  windowType: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  frames?: UpperWindowFrameType[] & FixWindowFrameType[] & WindowFrameType[];
}