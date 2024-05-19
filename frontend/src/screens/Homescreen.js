import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Image,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import Productcarousel from "../components/Productcarousel"; 
import { useGetCandidatesQuery } from "../sclices/candidateApisclice";

const Homescreen = () => {
  const { data: candidates, isLoading, error } = useGetCandidatesQuery();

  const [age, setAge] = useState(0);

  const checkeligibility = (e) => {
    e.preventDefault();
    if (age >= 18) {
      toast.success("You are eligible to vote");
    } else {
      toast.error("You are not eligible to vote");
    }
  };

  if (isLoading) {
    return <Spinner animation="border" variant="info" />;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <Container className="my-4">
        <Row>
          <Col md="6" className="d-flex justify-content-center">
            <Productcarousel />
          </Col>
          <Col md="6">
            <h3 className="head-text"> Are you Eligible To Vote? </h3>
            <Form onSubmit={checkeligibility}>
              <Form.Group controlId="age">
                <Form.Label>Enter Your Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="my-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

        <Table className="table table-bordered table-hover my-4">
          <thead className="thead-dark">
            <tr>
              <th>Party</th>
              <th>Symbol</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.parties}</td>
                <td>
                  <Image src={candidate.symbol} style={{ width: 40 }}></Image>
                </td>
                <td>{candidate.votes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Homescreen;
