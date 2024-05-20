import React from "react";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetCandidatesByIdQuery } from "../sclices/candidateApisclice";
import "../style/aboutcandidate.css"
const Aboutcandidate = () => {
  const { id: candidateId } = useParams();
  const {
    data: candidates,
    isLoading,
    error,
  } = useGetCandidatesByIdQuery(candidateId);
  const navigate = useNavigate();

  const voteforcandidate = async () => {
    navigate("/auth?redirect=/vote");
    console.log("Voted");
  };

  if (isLoading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-4">
        <p>Error: {error.message}</p>
      </Container>
    );
  }

  return (
    <div>
      <Button
        variant=""
        onClick={() => navigate("/candidates")}
        className="btn btn-outline-secondary my-4 "
      >
        Back to Candidates
      </Button>

      <Container className="my-4 about-candidate-screen">
        <Row>
          <Col md={6}>
            <Image src={candidates.image} alt={candidates.name} fluid  className="candidate-image"/>
          </Col>
          <Col md={6}>
            <h2>{candidates.name}</h2>
            <h3 style={{ display: "inline" }}>{candidates.parties}</h3>
            <Image
              src={candidates.symbol}
              alt={candidates.name}
              fluid
              style={{ width: 40 }}
              className="mx-2"
            />
            <p className="my-3">{candidates.description}</p>
            <Button variant="success" onClick={voteforcandidate}>
              Vote
            </Button>

            <h3 className="my-4">No Vote</h3>
            <span className="mx-4"><strong>{candidates.votes}</strong></span>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Aboutcandidate;
