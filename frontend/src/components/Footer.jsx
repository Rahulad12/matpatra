import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../style/footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col className="text-center py-3">CopyRight &copy; rahuladhikari</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
