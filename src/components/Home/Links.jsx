import Box from "@mui/material/Box";
import EastIcon from "@mui/icons-material/East";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function Links(props) {
  const links = ["Ibuprofen", "Amoxicillin", "Omeprazole"];

  return (
    <Box>
      <Typography variant="h6">Quick Links</Typography>
      <List dense={true}>
        {links.map((link, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <EastIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Link
                  color="inherit"
                  underline="hover"
                  style={{ cursor: "pointer" }}
                  onClick={props.handleLinkSearch}
                >
                  {link}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
