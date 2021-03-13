import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container, ListGroup } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  console.log(params);
  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams({
      ...params,
      [param]: value,
    });
  }

  return (
    <Container className='bg-light'>
      <h1 className='display-4 mb-4'>GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination
        page={page}
        setPage={setPage}
        jobs={jobs}
        hasNextPage={hasNextPage}
      />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing</h1>}
      {jobs && (
        <ListGroup>
          {jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default App;
