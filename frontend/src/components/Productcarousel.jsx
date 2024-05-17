import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Spinner } from "react-bootstrap";
import { useGetHighestVotedCandidateQuery } from "../sclices/candidateApisclice";
import Message from "./Message";
import "../style/productcarousel.css";
const Productcarousel = () => {
  const {
    data: candidates,
    isLoading,
    error,
  } = useGetHighestVotedCandidateQuery();
  if (isLoading) {
    return <Spinner animation="border" />;
  } else if (error) {
    <Message />;
    return <h2>Error: {error}</h2>;
  } else {
    return (
      <Carousel pause="hover" className="bg-dark carousel">
        {candidates.map((candidate) => (
          <Carousel.Item key={candidate._id}>
            <Link to={`/candidates/${candidate._id}`}>
              <Image
                src={candidate.image}
                alt={candidate.name}
                fluid
                className="carousel-image"
              />
              <Carousel.Caption className="carousel-caption text-light ">
                <small>{candidate.name}</small>
                <span>
                  <strong><Image src={candidate.symbol} style={{
                    width: "50px",
                    height: "50px",
                    
                  
                  }}></Image></strong>
                </span>
                <h2>Vote: <strong>{candidate.votes}</strong></h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
};

export default Productcarousel;
