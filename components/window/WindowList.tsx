import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import WindowType from "../../interface/window";
import { ExpandMore } from "@mui/icons-material";

interface WindowListProps {
  windows: WindowType[];
}

const WindowList = ({windows}: WindowListProps) => {
  console.log(windows);
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
              <div>
                {/* {window._id} */}
              </div>
              <div>
                {new Date(window.createdDate)?.toLocaleString()}
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </>
  )
}

export default WindowList;