import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLoginMutation } from "../sclices/citizenAPIsclice";
import { setCredentials } from "../sclices/authSlice";

const Vote = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [citizenid, setCitizenId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { citizenInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (citizenInfo) {
      navigate(redirect);
    }
  }, [navigate, citizenInfo, redirect]);

  const submithandler = async (e) => {
    e.preventDefault();
    if (!citizenid || !name || !password) {
      return toast.error("Please fill all the fields");
    } else if (citizenid.length !== 8 || password.length < 3) {
      return toast.error("Invalid Citizen ID or Password");
    } else {
      try {
        const res = await login({ name, password, citizenid }).unwrap();

        if (res.error) {
          toast.error(res.error);
        } else {
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success("Success! You can vote now.");
        }
      } catch (err) {
        toast.error("Invalid Citizen ID or Password");
      }
    }
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

  return (
    <>
      <Form onSubmit={submithandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Enter Your Name (मतदाता को नाम)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Enter Your Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="citizenId">
          <Form.Label>Enter Your ID (मतदाता आईडी)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your ID"
            value={citizenid}
            onChange={(e) => setCitizenId(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="my-3"
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    </>

  );
};

export default Vote;
