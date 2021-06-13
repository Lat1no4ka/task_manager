import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import { useAuth } from "../hooks/auth.hook";

const AuthPage = () => {

  const { loading, error, request } = useHttp();
  const {login} = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email || password) {
      try {
        const body = { userName: email, password: password };
        const data = await request(`${process.env.REACT_APP_API_URL}/auth`, "POST", JSON.stringify(body));
        login(data);
      } catch (error) {
        console.log(error);
      }
    } else return null;
  };

  return (
    <div className="container col-4">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          disabled={loading}
          variant="dark"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Enter
        </Button>
      </Form>
    </div>
  );
};

export default AuthPage;
