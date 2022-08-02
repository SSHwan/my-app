import FixWindowFrameType from "./fixWindowFrame";
import UpperWindowFrameType from "./upperWindowFrame";
import WindowFrameType from "./windowFrame";

export default interface FrameType extends UpperWindowFrameType, FixWindowFrameType, WindowFrameType {}