import React from "react";
import { Container, Card, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

import { Link } from "react-router-dom";
import "../style/candidates.css";
import { useSelector } from "react-redux";
const Candidate = ({ candidate }) => {
  const { citizenInfo } = useSelector((state) => state.auth);
  return (
    <Container>
      <Card className="my-3 p-3 rounded">
        <Link to={`/candidates/${candidate._id}`}>
          <Card.Img
            src={candidate.image}
            variant="top"
            className="card-image"
          />
        </Link>

        <Card.Body>
          <Link to={`/candidates/${candidate._id}`}>
            <Card.Title as="div">
              <strong>{candidate.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">{candidate.parties}</div>
          </Card.Text>

          <Card.Text as="div">
            <Image
              src={candidate.symbol}
              alt={candidate.name}
              fluid
              style={{ width: 40 }}
              className="mx-2"
            />
            <p>
              {" "}
              <b>Votes:</b> {candidate.votes}
            </p>
          </Card.Text>
          {citizenInfo && citizenInfo.isAdmin && (
            
            <Link to={`/admin/candidates/${candidate._id}/edit`}>
              <FaEdit className="edit-icon" />
            </Link>
          )}
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Candidate;
