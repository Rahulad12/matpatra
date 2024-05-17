// import React from "react";
// import { useParams } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Alert,
//   Spinner,
//   Image,
//   Table,
// } from "react-bootstrap";
// // import { useVotingConfirmQuery } from "../sclices/candidateApisclice";
// import "../style/cvotescreen.css";

// const Votingconfirmscreen = () => {
//   // const { id: candidateId } = useParams();
//   // const {
//   //   data: candidates,
//   //   isLoading,
//   //   error,
//   // } = useVotingConfirmQuery(candidateId);
//   if (isLoading) {
//     return (
//       <Container>
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <Alert variant="danger">
//           Error fetching candidate details: {error.message}
//         </Alert>
//       </Container>
//     );
//   }

//   if (!candidates) {
//     return (
//       <Container>
//         <Alert variant="info">Candidate details not found!</Alert>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <h1 className="head-text my-4">You Had voted </h1>

//       <Container className="align-center">
//         <Row className="row-align">
//           <Col md={6} className="image-controller">
//             <img
//               src={candidates.image}
//               alt={candidates.name}
//               style={{ width: 200 }}
//             />
//           </Col>
//           <Col md={6}>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Party</th>
//                   <th>Symbol</th>
//                   <th>Vote</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{candidates.name}</td>
//                   <td>{candidates.parties}</td>
//                   <td>
//                     <Image
//                       src={candidates.symbol}
//                       className="symbol-image"
//                     ></Image>
//                   </td>
//                   <td>{candidates.votes}</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Votingconfirmscreen;
