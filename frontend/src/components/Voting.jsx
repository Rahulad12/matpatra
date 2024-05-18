import { Table, Button, Container, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useVoteMutation } from "../sclices/citizenAPIsclice";
import { useDeleteCitizenMutation } from "../sclices/citizenAPIsclice";
import { useGetCitizenByIdQuery } from "../sclices/citizenAPIsclice";
import {
  setCandidateCredentials,
  clearCandidateCredentials,
} from "../sclices/CandidateSlice";
import { clearCredentials } from "../sclices/authSlice";


const Voting = ({ candidate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidateInfo } = useSelector((state) => state.candidate);
  const { citizenInfo } = useSelector((state) => state.auth);

  //getting citizen by id
  const { data: citizens } = useGetCitizenByIdQuery(citizenInfo._id);
  
  
  const [updateVote, { isLoading: isVoting }] = useVoteMutation();
  const [deleteCitizen, { isLoading: isDeleting }] = useDeleteCitizenMutation();

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    if (candidateInfo) {
      setIsButtonClicked(true);
    }
  }, [candidateInfo]);

  const handleVoteAndDelete = async (candidateId) => {
    if (!window.confirm("Are you sure you want to vote for this candidate?")) {
      return;
    }

    try {
      await updateVote({ candidateId });
      dispatch(setCandidateCredentials(candidateId));

      // console.log(citizenInfo._id);

      // console.log(deleteCitizen({ citizenId: citizenInfo._id}));

      await deleteCitizen({ citizenId: citizens._id });

      dispatch(clearCredentials());
      dispatch(clearCandidateCredentials());

      toast.success("You have voted successfully");

      // Clear session storage or local storage if you use them for storing tokens
      sessionStorage.clear();
      localStorage.clear();

      // Redirect to login page or home page after session is cleared
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to vote");
    }
  };

  if (isVoting || isDeleting) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Symbol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {candidate.map((candidates) => (
            <tr key={candidates._id}>
              <td>{candidates.name}</td>
              <td>{candidates.parties}</td>
              <td>
                <Image src={candidates.symbol} className="symbol-image" />
              </td>
              <td>
                <Button
                  variant="dark"
                  onClick={() => handleVoteAndDelete(candidates._id)}
                  disabled={isButtonClicked}
                >
                  Vote
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default Voting;
