import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const BASE_FDA_API_ENDPOINTS = {
  events: `https://api.fda.gov/drug/event.json`,
  labels: `https://api.fda.gov/drug/label.json`,
  ndc: `https://api.fda.gov/drug/ndc.json`,
  enforcements: `https://api.fda.gov/drug/enforcement.json`,
  drugsFDA: `https://api.fda.gov/drug/drugsfda.json`,
};

export function GradientCircularProgress() {
  return (
    <Box sx={{ margin: "5% 50%" }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </Box>
  );
}

export function mapObject(obj) {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return (
        <Box key={key}>
          <Typography>{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
          <Box style={{ marginLeft: "20px" }}>{mapObject(value)}</Box>
        </Box>
      );
    } else if (Array.isArray(value)) {
      return (
        <Typography key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
          {value.map((v) => v).join(", ")}
        </Typography>
      );
    } else if (typeof value === "string" && value.startsWith("<table")) {
      return <div key={key} dangerouslySetInnerHTML={{ __html: value }} />;
    } else {
      return (
        <Typography key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
        </Typography>
      );
    }
  });
}
