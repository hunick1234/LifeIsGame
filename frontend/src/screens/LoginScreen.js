import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN } from "../API";
import useUserInfo from "../hook/useUserInfo";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useUserInfo();

  const submitHandler = async (e) => {
    e.preventDefault();
    const respon = await fetch(LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        account: {
          email: email,
          password: password,
        },
      }),
    });

    let data = await respon.json();
    console.log("data",data);
    setUserInfo(data.info)
    navigate("/", { replace: true });
  };

  return (
    <Form className="mx-auto" onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginScreen;
