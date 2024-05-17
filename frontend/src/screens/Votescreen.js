import React from "react";
import Voting from "../components/Voting";
import { Container, Spinner } from "react-bootstrap";
import { useGetCandidatesQuery } from "../sclices/candidateApisclice";

const Votescreen = () => {
  const { data: candidates, isLoading } = useGetCandidatesQuery();
  if (isLoading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  return (
    <div>
      <Voting candidate={candidates} />
    </div>
  );
};

export default Votescreen;
