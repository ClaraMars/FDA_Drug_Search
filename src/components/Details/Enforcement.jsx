import { Box, Chip } from "@mui/material";
import { mapObject } from "../../utils/Utils";

export default function Enforcement(props) {
  const data = props.data;

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      return key !== "openfda";
    })
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mb={2}>
      <Chip
        style={{ width: "100px", marginLeft: "auto" }}
        label={data.status}
        color={
          data.status === "Completed"
            ? "success"
            : data.status === "Terminated"
            ? "info"
            : "warning"
        }
        variant="outlined"
      />
      {mapObject(filteredData)}
    </Box>
  );
}
