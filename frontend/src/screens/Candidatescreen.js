import React from "react";
import { Container, Row, Col, Spinner, Button} from "react-bootstrap";
import Candidate from "../components/Candidate";
import Message from "../components/Message";
import {
  useGetCandidatesQuery,
  useCreateCandidateMutation,
} from "../sclices/candidateApisclice";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

const Candidatescreen = () => {
  const { citizenInfo } = useSelector((state) => state.auth);

  const {
    data: candidates,
    isLoading,
    error,
    refetch,
  } = useGetCandidatesQuery();

  const [createCandidate, { isLoading: createCandidateloading }] =
    useCreateCandidateMutation();

  const createCandidateHandler = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await createCandidate();
        refetch();
      } catch (error) {
        toast.error("Failed to create candidate");
      }
    }
  };
  if (isLoading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-4">
        <Message />
        <p>Error: {error.message}</p>
      </Container>
    );
  }

  return (
    <div>
      <>
        <h1 className="head-text">Candidates</h1>

        <Container>
          {citizenInfo && citizenInfo.isAdmin && (
            <Button
              className="my-3 btn btn-dark btn-sm btn-block  text-end"
              onClick={createCandidateHandler}
              disabled={createCandidateloading}
            >
              Create Candidate
            </Button>
          )}

          <Row>
            {candidates.map((candidates) => {
              return (
                <Col key={candidates._id} sm={12} md={6} lg={4} xl={3}>
                  <Candidate candidate={candidates} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    </div>
  );
};

export default Candidatescreen;
