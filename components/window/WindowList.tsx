import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import WindowType from "../../interface/window";
import { ExpandMore, CreateOutlined } from "@mui/icons-material";

interface WindowListProps {
  windows: WindowType[];
  onClickUpdate: Function;
}

const WindowList = ({windows, onClickUpdate}: WindowListProps) => {
  const onClickEditTitle = (window: WindowType) => {
    onClickUpdate(window)
  }
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
                <div>
                  <Button variant="outlined" startIcon={<CreateOutlined/>} onClick={() => onClickEditTitle(window)}>제목 수정</Button>
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