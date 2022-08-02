import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import WindowType from "../../interface/window";
import { ExpandMore, CreateOutlined, DeleteOutlined, LoginOutlined } from "@mui/icons-material";
import Link from "next/link";

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
                  <Link href={{ pathname: `/window/${window._id}`, query: { window: JSON.stringify(window) }}} >
                    <Button variant="outlined" startIcon={<LoginOutlined/>} >편집</Button>
                  </Link>
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