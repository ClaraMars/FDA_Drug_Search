import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CustomFooter = styled("footer")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  color: theme.palette.mode === "dark" ? "#55A6F6" : "#0959AA",
  backgroundColor: theme.palette.mode === "dark" ? "#090E10" : "#FFF",
}));

export default function Footer() {
  return (
    <CustomFooter component="footer">
      <Divider />
      <Typography p={3} color="text.secondary">
        FDA-Approved Drugs Search Project - 2024
      </Typography>
    </CustomFooter>
  );
}
