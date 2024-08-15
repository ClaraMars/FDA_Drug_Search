import "./Details.css";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
  mapObject,
} from "../../utils/Utils";
import { getDrugsResults } from "../../utils/Fetch";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore, WestRounded } from "@mui/icons-material";
import { styled } from "@mui/system";
import Ndc from "./Ndc";
import Enforcement from "./Enforcement";
import Event from "./Events";
import Label from "./Labels";

const CustomTypographyDrugHeader = styled(Box)(({ theme }) => ({
  padding: "1rem",
  backgroundColor: theme.palette.mode === "dark" ? "#02294F" : "#BBDCFD",
}));

const CustomTypographyDetailsHeader = styled(Typography)(() => ({
  cursor: "pointer",
  textAlign: "center",
  paddingBottom: "0.5rem",
}));

export default function Details() {
  const { applicationNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.data;
  const isOpenfdaNotEmpty = Object.keys(data?.openfda || {}).length !== 0;

  const [generalInfo, setGeneralInfo] = useState(true);
  const [eventsState, setEventsState] = useState(null);
  const [labelsState, setLabelsState] = useState(null);
  const [ndcState, setNdcState] = useState(null);
  const [enforcementsState, setEnforcementsState] = useState(null);
  const [renderComponent, setRenderComponent] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsState = {
    events: [
      eventsState,
      setEventsState,
      "patient.drug.openfda.application_number",
    ],
    labels: [labelsState, setLabelsState, "openfda.application_number"],
    ndc: [ndcState, setNdcState, "application_number"],
    enforcements: [
      enforcementsState,
      setEnforcementsState,
      "openfda.application_number",
    ],
  };

  const components = [
    {
      data: resultsState.ndc[0]?.data[0],
      Component: Ndc,
      title: "National Drug Code",
    },
    {
      data: resultsState.labels[0]?.data[0],
      Component: Label,
      title: "Product Labeling",
    },
    {
      data: resultsState.events[0]?.data[0],
      Component: Event,
      title: "Adverse Events",
    },
    {
      data: resultsState.enforcements[0]?.data[0],
      Component: Enforcement,
      title: "Recall Enforcement Reports",
    },
  ];

  const filteredOpenFda =
    isOpenfdaNotEmpty &&
    Object.entries(data?.openfda).filter(([key, value]) => {
      return (
        key !== "application_number" &&
        key !== "brand_name" &&
        key !== "generic_name"
      );
    });

  const handleToggleGeneralInfo = () => {
    setGeneralInfo(true);
    setRenderComponent(false);
  };
  const handleToggleComponents = (index) => {
    setGeneralInfo(false);
    setRenderComponent(true);
    setSelectedComponent(index);
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    setIsLoading(true);
    Object.entries(resultsState).forEach(
      ([key, [state, setState, searchParam]]) => {
        const url = `${BASE_FDA_API_ENDPOINTS[key]}?search=${searchParam}:${applicationNumber}`;
        getDrugsResults(url, setState, setIsLoading, setError);
      }
    );
    setIsLoading(false);
  }, []);

  return (
    <Box p="0 5rem">
      <Link
        href="#"
        underline="hover"
        display={"flex"}
        alignItems={"center"}
        gap={2}
        onClick={handleBack}
      >
        <WestRounded />
        Go back
      </Link>
      <Box mt={3} mb={3} p={1} pb={4}>
        <Typography variant="h4" mb={3}>
          Drug {applicationNumber}
        </Typography>
        <CustomTypographyDrugHeader>
          {isOpenfdaNotEmpty ? (
            <>
              <Typography variant="h4">
                {data.openfda?.brand_name?.join(", ")}
              </Typography>
              <Typography variant="h6" mt={1}>
                {data.openfda?.generic_name?.join(", ")}
              </Typography>
            </>
          ) : (
            <Typography variant="h4">{data.sponsor_name}</Typography>
          )}

          <Typography variant="h6" mt={1} color={"text.secondary"}>
            {data.openfda?.application_number?.join(", ") ?? applicationNumber}
          </Typography>
        </CustomTypographyDrugHeader>

        {isLoading ? (
          <GradientCircularProgress />
        ) : (
          <Box mt={4} mb={4}>
            <Box className="c-details__info-header-wrapper">
              <CustomTypographyDetailsHeader
                style={{
                  borderBottom: generalInfo
                    ? "2px solid #90caf9"
                    : "2px solid transparent",
                }}
                className="c-details__info-header"
                variant="h6"
                color={generalInfo ? "primary" : "textPrimary"}
                onClick={() => handleToggleGeneralInfo(selectedComponent)}
              >
                General information
              </CustomTypographyDetailsHeader>
              {components.map(
                ({ title }, index, data) =>
                  data[index].data !== null &&
                  data[index].data !== undefined && (
                    <CustomTypographyDetailsHeader
                      key={index}
                      style={{
                        borderBottom:
                          renderComponent && selectedComponent === index
                            ? "2px solid #90caf9"
                            : "2px solid transparent",
                      }}
                      className="c-details__info-header"
                      variant="h6"
                      color={
                        renderComponent && selectedComponent === index
                          ? "primary"
                          : "textPrimary"
                      }
                      onClick={() => handleToggleComponents(index)}
                    >
                      {title}
                    </CustomTypographyDetailsHeader>
                  )
              )}
            </Box>
            <Box mt={4}>
              {generalInfo ? (
                <>
                  {isOpenfdaNotEmpty && (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      gap={2}
                      mb={2}
                    >
                      {filteredOpenFda.map(([key, value]) => (
                        <Typography key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                          {Array.isArray(value) ? value.join(", ") : value}
                        </Typography>
                      ))}
                    </Box>
                  )}
                  <Divider />
                  <Accordion style={{ boxShadow: "none" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="products-content"
                      id="products-header"
                      style={{ fontSize: "1.5rem" }}
                    >
                      Products ({data.products?.length})
                    </AccordionSummary>
                    <AccordionDetails>
                      {data.products?.map((product) => (
                        <li
                          key={product.product_number}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            spacing={2}
                          >
                            <Typography variant="h6" component="span">
                              {product.active_ingredients
                                .map(
                                  (ingredient) =>
                                    `${ingredient.name} ${ingredient.strength}`
                                )
                                .join(", ")}
                            </Typography>
                            <Chip
                              label={product.marketing_status}
                              color={
                                product.marketing_status === "Prescription"
                                  ? "secondary"
                                  : product.marketing_status === "Discontinued"
                                  ? "error"
                                  : product.marketing_status === "None"
                                  ? "warning"
                                  : product.marketing_status ===
                                    "Over-the-counter"
                                  ? "success"
                                  : "primary"
                              }
                              variant="outlined"
                            />
                          </Stack>
                          {mapObject(product)}
                        </li>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion style={{ boxShadow: "none" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="submissions-content"
                      id="submissions-header"
                      style={{ fontSize: "1.5rem" }}
                    >
                      Submisions ({data.submissions?.length})
                    </AccordionSummary>
                    <AccordionDetails>
                      {data.submissions?.map((submission) => (
                        <li
                          key={`${submission.submission_number}${submission.submission_status_date}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Typography variant="h6" component="span">
                            {submission.submission_type}
                          </Typography>
                          {mapObject(submission)}
                        </li>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </>
              ) : (
                <>
                  {renderComponent &&
                    selectedComponent !== null &&
                    components[selectedComponent].data &&
                    (selectedComponent === 0 ? (
                      <Ndc data={components[selectedComponent].data} />
                    ) : selectedComponent === 1 ? (
                      <Label data={components[selectedComponent].data} />
                    ) : selectedComponent === 2 ? (
                      <Event data={components[selectedComponent].data} />
                    ) : (
                      <Enforcement data={components[selectedComponent].data} />
                    ))}
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
