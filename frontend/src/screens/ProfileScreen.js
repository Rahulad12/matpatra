import React from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableBody,
} from "mdb-react-ui-kit";

import {
  Container,
  Row,
} from "react-bootstrap";

import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { citizenInfo } = useSelector((state) => state.auth);

  return (
    <>
      <h1 className="head-text">Profile</h1>

      <Container
        style={{
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Row>
          <MDBTable align="middle" hover>
            <MDBTableBody>
              <tr>
                <td>
                  <div className=" d-inline">
                    <img
                      src="https://media.istockphoto.com/id/2089714096/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=zvauXmi3NetJfTPkVQVulp-7qKTvCmj2DugXVdQ79IU="
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "45px", height: "45px" }}
                    />
                  </div>
                  <div className="ms-3 d-inline">
                    <small className="fw-bold mb-0">{citizenInfo.name}</small>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong> Full Name </strong>
                </td>
                <td>{citizenInfo.name}</td>
              </tr>

              <tr>
                <td>
                  {" "}
                  <strong>Voter Id</strong>
                </td>
                <td>{citizenInfo.citizenid}</td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <strong>Status</strong>
                </td>
                <td>
                  <MDBBadge color="success" pill>
                    Active
                  </MDBBadge>
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
