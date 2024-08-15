import { Box } from "@mui/material";
import { mapObject } from "../../utils/Utils";

export default function Events(props) {
  const data = props.data;
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mb={2}>
      {mapObject(data)}
    </Box>
  );
}
