import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useUpdateCandidateMutation,
  useGetCandidatesByIdQuery,
  useUploadCandidateImageMutation,
  useUpdateSymbolMutation
} from "../sclices/candidateApisclice";

const ProductEditScreen = () => {
  // Corrected component name
  const { id: candidateId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [symbol, setSymbol] = useState("");
  const [parties, setParties] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: candidate,
  } = useGetCandidatesByIdQuery(candidateId);

  const [updateCandidate, ] =
    useUpdateCandidateMutation();

  const [uploadCandidateImage] =
    useUploadCandidateImageMutation();

  const [updateSymbol] =  useUpdateSymbolMutation();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (candidate) {
      // Use directly accessed properties from candidate object
      setName(candidate.name);
      setImage(candidate.image);
      setSymbol(candidate.symbol);
      setParties(candidate.parties);
      setAge(candidate.age);
      setDescription(candidate.description);
    }
  }, [candidate]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadCandidateImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const uploadPartiesFlagHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await updateSymbol(formData).unwrap();
      toast.success("Symbol uploaded successfully");
      setSymbol(res.image);
    } catch (error) {
      toast.error("Symbol upload failed");
    }
  };

  return (
    <>
      <Link to="/candidates" className="btn btn-light my-3">
        Go Back
      </Link>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await updateCandidate({
              _id: candidateId,
              name,
              image,
              symbol,
              parties,
              age,
              description,
            });
            toast.success("Candidate updated successfully");
            navigate("/candidates");
          } catch (error) {
            toast.error("Failed to update candidate");
          }
        }}
      >
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.Control
            type="file"
            label="choose File"
            onChange={uploadFileHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="symbol">
          <Form.Label>Symbol</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter symbol url"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          ></Form.Control>

          <Form.Control
            type="file"
            label="choose File"
            onChange={uploadPartiesFlagHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="parties">
          <Form.Label>Parties</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter parties"
            value={parties}
            onChange={(e) => setParties(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-4">
          Update
        </Button>
      </Form>
    </>
  );
};

export default ProductEditScreen; // Corrected export name
