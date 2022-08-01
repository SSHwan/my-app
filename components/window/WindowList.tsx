import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import WindowType from "../../interface/window";
import { ExpandMore, CreateOutlined, DeleteOutlined } from "@mui/icons-material";

interface WindowListProps {
  windows: WindowType[];
  onClickUpdate: Function;
  onClickDelete: Function;
}

const WindowList = ({windows, onClickUpdate, onClickDelete}: WindowListProps) => {
  return (
    <>
      {
        windows.map((window) => (
          <Accordion key={window._id}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              title={window.title}
            >
              <div>{window.title}</div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex justify-between">
                <div>
                  { window.createdDate ? new Date(window.createdDate).toLocaleString() : ''}
                </div>
                <div className="flex gap-5">
                  <Button variant="outlined" startIcon={<DeleteOutlined/>} onClick={() => onClickDelete(window._id)}>삭제</Button>
                  <Button variant="outlined" startIcon={<CreateOutlined/>} onClick={() => onClickUpdate(window)}>제목 수정</Button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </>
  )
}

export default WindowList;