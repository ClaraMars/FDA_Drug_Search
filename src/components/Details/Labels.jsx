import { Box } from "@mui/material";
import { mapObject } from "../../utils/Utils";

export default function Labels(props) {
  const data = props.data;

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      return key !== "openfda";
    })
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mb={2}>
      {mapObject(filteredData)}
    </Box>
  );
}
