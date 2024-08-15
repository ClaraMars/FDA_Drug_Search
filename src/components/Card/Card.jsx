import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

const CustomCard = styled(Card)(({ theme }) => ({
  width: 300,
  margin: 8,
  border:
    theme.palette.mode === "dark" ? "1px solid #454545" : "1px solid #BBB",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export default function DrugCard(props) {
  const navigate = useNavigate();
  const data = props.results;
  const isOpenfdaNotEmpty = Object.keys(data.openfda || {}).length !== 0;

  const handleCardDetails = () => {
    const applicationNumber = data.application_number;
    navigate(`/drug/${applicationNumber}`, { state: { data: data } });
  };

  return (
    <CustomCard>
      <Box>
        <Box
          display="flex"
          direction="row"
          alignItems="start"
          justifyContent="space-between"
          p={2}
        >
          <CardHeader
            style={{ padding: 0 }}
            title={
              isOpenfdaNotEmpty
                ? data.openfda?.brand_name?.slice(0, 2).join(", ") +
                  (data.openfda?.brand_name?.length > 2 ? "..." : "")
                : data.products
                ? data.products?.length > 0 && data?.products[0].brand_name
                : ""
            }
            subheader={data.application_number}
          />
          {isOpenfdaNotEmpty && data.openfda?.route && (
            <Chip
              label={data.openfda?.route}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
        <Divider />

        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Sponsor
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {data.sponsor_name}
          </Typography>
          {isOpenfdaNotEmpty && (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {data.openfda.manufacturer_name?.slice(0, 2).join(", ") +
                (data.openfda.manufacturer_name?.length > 2 ? "..." : "")}
            </Typography>
          )}
          <Accordion style={{ boxShadow: "none" }}>
            <AccordionSummary
              style={{ padding: 0 }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="products-content"
              id="products-header"
            >
              Products{" "}
              <Typography component="span" color="text.secondary">
                ({data.products?.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data?.products?.map((product) => (
                <li key={product.product_number}>
                  <Typography component="span">
                    {product.active_ingredients
                      .map(
                        (ingredient) =>
                          `${ingredient.name} ${ingredient.strength}`
                      )
                      .join(", ")}
                  </Typography>
                </li>
              ))}
            </AccordionDetails>
          </Accordion>
          <Typography variant="body1">
            Total submissions: {data.submissions ? data.submissions.length : 0}
          </Typography>
        </CardContent>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" p={1}>
        <CardActions>
          <Button variant="outlined" onClick={handleCardDetails}>
            View more
          </Button>
        </CardActions>
      </Box>
    </CustomCard>
  );
}
