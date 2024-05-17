import React from "react";
import Vote from "../components/Vote";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../style/votingscreen.css"

const Loginscreen = () => {
  return (
    <>
      <h1 className="head-text my-4"> Enter Your Details For Vote</h1>

      <Container className="my-3 screen-container">
        <Row>
          <Col md={6}>
            <Image src="/images/voting.jpg" alt="vote" fluid></Image>
          </Col>
          <Col md={6}>
            <Vote />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Loginscreen;
