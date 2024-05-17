import React from "react";
import { Alert, Container } from "react-bootstrap";

const Message = () => {
  return (
    <Container className="text-center my-4">
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      </Alert>  
    </Container>
  );
};

export default Message;
