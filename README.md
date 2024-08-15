# FDA-Approved Drugs Search Project

## Description

The application is a search tool for FDA-approved drugs in the U.S. that uses the openFDA API to perform queries. The application has been developed using Vite and React, using the Material-UI component library.

The `/drugsfda` endpoint performs a general search for drugs and, once their application number is obtained, the application searches in the other endpoints to gather as much information as possible about that drug.

## Features

- **General search:** the search tool returns results that contain the entered keyword. If multiple words are entered, it returns results that containing any of them.
- **Search filters:** a more specific search can be performed by adding one of the following filters:
  - Application number
  - Manufacturer name
  - Sponsor name
  - Brand name
  - Generic name
- **Adjustable number of results:** it also allows the user to specify the number of results to be displayed.
- **Quick links:** predefined links for the most common searches.
- **Reset search:** the user can click on the "Reset" button to perform a new search, clearing the search results.
- **Load more results:** if the number of results is greater than the number displayed, the user can click on the "Load more results" button to display more results as needed.
- **Drug details:** to view information about a drug, click the "View more" button. The detailed information of the selected drug will be displayed in a new route, with its corresponding information for the `/ndc`, `/label`, `/event`, and `/enforcement` endpoints.
- **Return to Home Page:** to return to the home page, click on the "Go back" button.
