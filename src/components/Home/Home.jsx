import "./Home.css";
import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import { getDrugsResults } from "../../utils/Fetch";
import Links from "./Links";
import Results from "./Results";

const CustomTypographyH1 = styled(Typography)({
  fontSize: "4rem",
  margin: "0 0 2rem",
  fontWeight: "600",
});

const BlueTypographyH1 = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#55A6F6" : "#0959AA",
}));

const CustomTypographySubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#94A6b8" : "#4C5967",
  width: "80%",
}));

export default function Home() {
  const [query, setQuery] = useState({
    term: "",
    limit: 10,
    skip: 0,
    filter: "",
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addFilter, setAddFilter] = useState(false);
  const [searchTermFilter, setSearchTermFilter] = useState("");
  const [changeLimit, setChangeLimit] = useState(10);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e, searchTerm, limit) => {
    e.preventDefault();
    if (!searchTerm) {
      setError(true);
      return;
    }

    const trimmedSearchTerm = searchTerm
      .trim()
      .split(" ")
      .map((term) => `*${term}*`);

    const hasFilter = searchTermFilter
      ? `${searchTermFilter}:(${trimmedSearchTerm.join("+AND+")})`
      : `(${trimmedSearchTerm.join("+AND+")})`;

    setQuery((prevState) => ({
      ...prevState,
      limit: changeLimit,
      filter: hasFilter,
    }));

    const searchUrl = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?&search=${hasFilter}&limit=${changeLimit}&skip=${query.skip}`;
    await getDrugsResults(searchUrl, setResults, setIsLoading, setError);
    setSearchPerformed(true);
  };

  const handleAddFilter = () => {
    setAddFilter(true);
  };

  const handleChangeFilter = (e) => {
    setSearchTermFilter(e.target.value);
  };

  const handleChangeLimit = (e) => {
    setChangeLimit(e.target.value);
    setQuery((prevState) => ({ ...prevState, limit: e.target.value }));
  };

  const handleLinkSearch = (e) => {
    e.preventDefault();
    setQuery((prevState) => ({ ...prevState, term: e.target.innerText }));
    handleSearch(e, e.target.innerText, query.limit);
  };

  const handleResetSearch = () => {
    setQuery({ term: "", limit: 10, skip: 0, filter: "" });
    setResults(null);
    setSearchPerformed(false);
    setAddFilter(false);
    setSearchTermFilter("");
    setChangeLimit(10);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Box p="0 5rem" className="o-container">
      <Box className="c-home__box-titles">
        <CustomTypographyH1 variant="h1">
          FDA Drug
          <BlueTypographyH1> Search</BlueTypographyH1>
        </CustomTypographyH1>
        <CustomTypographySubtitle variant="subtitle1">
          Search for detailed information on FDA-approved drugs. Add filters to
          perform a more specific search, and click on 'Reset' to start a new
          search.
        </CustomTypographySubtitle>
      </Box>
      <Box className="c-home__box-search">
        <FormControl
          className="c-home__box-search-form"
          component="form"
          onSubmit={(e) => handleSearch(e, query.term, query.limit)}
        >
          <Box className="c-home__input-wrapper">
            <TextField
              type="search"
              autoComplete="off"
              id="outlined-basic"
              label="Search for a drug"
              value={query.term}
              onChange={(e) =>
                setQuery((prevState) => ({
                  ...prevState,
                  term: e.target.value,
                }))
              }
              onInput={(e) => {
                setResults(null);
              }}
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box className="c-home__buttons-wrapper">
              <Button
                className="c-home__button"
                type="submit"
                variant="contained"
              >
                Search
              </Button>
              <Button
                className="c-home__button"
                variant="contained"
                onClick={handleResetSearch}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </FormControl>
        <Box className="c-home__filter-wrapper">
          <Chip
            disabled={addFilter || searchPerformed}
            label="+ Add filters"
            color="primary"
            variant="outlined"
            onClick={handleAddFilter}
          />
          <Box className="c-home__filter-select" gap={3}>
            {addFilter && (
              <>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="search-field-label">Search field</InputLabel>
                  <Select
                    labelId="search-field-label"
                    id="search-field"
                    value={searchTermFilter}
                    label="Search field"
                    onChange={handleChangeFilter}
                    disabled={searchPerformed}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"application_number"}>
                      Application number
                    </MenuItem>
                    <MenuItem value={"openfda.manufacturer_name"}>
                      Manufacturer name
                    </MenuItem>
                    <MenuItem value={"sponsor_name"}>Sponsor name</MenuItem>
                    <MenuItem value={"openfda.brand_name"}>Brand name</MenuItem>
                    <MenuItem value={"openfda.generic_name"}>
                      Generic name
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="change-limit-label">Items shown</InputLabel>
                  <Select
                    labelId="change-limit-label"
                    id="change-limit"
                    value={changeLimit}
                    label="Items shown"
                    onChange={handleChangeLimit}
                    disabled={searchPerformed}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box mt={6} pb={10}>
        {isLoading ? (
          <GradientCircularProgress />
        ) : error ? (
          <Box mt={1} mb={1}>
            <Alert severity="error">
              {query.term === ""
                ? "Introduce una búsqueda"
                : "No hemos encontrado resultados"}
            </Alert>
          </Box>
        ) : results && results.data ? (
          <Results
            query={query}
            results={results}
            setResults={setResults}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <Links handleLinkSearch={handleLinkSearch} />
        )}
      </Box>
    </Box>
  );
}
