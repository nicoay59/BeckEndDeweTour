import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';

import { API } from '../../config/api';

function Register({ show, handleRegClose }) {


  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: 0,
    address: '',
  });

  // const { fullname, email, password, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log("register success : ", response)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);
      setForm({
        fullname: '',
        email: '',
        password: '',
        phone: 0,
        address: '',
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", error);
    }
  });


  return (
    <>
      <Modal show={show} onHide={handleRegClose}>
        <Modal.Title className="d-flex justify-content-center">
          Register
        </Modal.Title>
        <Modal.Body>
        {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" autoFocus  name="fullname" onChange={handleChange} />
              <Form.Label className="pt-2">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email" onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
              <Form.Label className="pt-2">Phone</Form.Label>
              <Form.Control type="tel" autoFocus  name="phone" onChange={handleChange} />
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" autoFocus  name="address" onChange={handleChange} />
            </Form.Group>
            <Button className="mb-3" variant="warning" onClick={handleRegClose} type="submit">
            Login
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Register;
