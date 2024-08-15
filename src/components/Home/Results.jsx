import { useState, useEffect } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getDrugsResults } from "../../utils/Fetch";
import {
  BASE_FDA_API_ENDPOINTS,
  GradientCircularProgress,
} from "../../utils/Utils";
import Card from "../Card/Card";

export default function Results(props) {
  const data = props.results;
  const [page, setPage] = useState(1);
  const [loadMoreResults, setLoadMoreResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMoreResults = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const skip = props.query.limit * page;
    const url = `${BASE_FDA_API_ENDPOINTS.drugsFDA}?search=${props.query.filter}&limit=${props.query.limit}&skip=${skip}`;
    await getDrugsResults(url, setLoadMoreResults, setIsLoading, setError);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await getMoreResults();
    if (loadMoreResults && loadMoreResults.data) {
      props.setResults((prevResults) => ({
        ...prevResults,
        data: [...prevResults.data, ...loadMoreResults.data],
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMoreResults();
  }, []);

  return (
    <>
      <Typography variant="h6" mb={3}>
        Search Results
      </Typography>
      {data ? (
        <>
          {data.totalResults !== 0 && (
            <Typography mb={3}>Total results: {data.totalResults}</Typography>
          )}

          <Box
            margin={"0 auto"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {props.isLoading ? (
              <GradientCircularProgress />
            ) : props.error ? (
              <Alert severity="error">No results found.</Alert>
            ) : (
              <Box sx={{ margin: "0 auto" }}>
                <Grid container justifyContent={"center"}>
                  {data.data.map((drug, index) => (
                    <Card key={index} results={drug} />
                  ))}
                </Grid>
                {isLoading && <GradientCircularProgress />}
                {props.loadMoreResults && props.loadMoreResults.data && (
                  <Grid>
                    {props.loadMoreResults.data.map((drug, index) => (
                      <Card key={index} results={drug} />
                    ))}
                  </Grid>
                )}
                {data.data.length < data.totalResults && (
                  <Box display="flex" justifyContent="center">
                    <Button
                      style={{ margin: "2rem 0 4rem" }}
                      variant="contained"
                      disabled={isLoading}
                      onClick={handleLoadMore}
                    >
                      Load more results
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </>
      ) : (
        error && (
          <Alert severity="error">
            Something went worng. Please try again.
          </Alert>
        )
      )}
    </>
  );
}
