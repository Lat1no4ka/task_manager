import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHttp } from "../hooks/http.hook";
import { useAuth } from "../hooks/auth.hook";

const AuthPage = () => {

  const { loading, error, request } = useHttp();
  const { login } = useAuth();
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

  const style = {
    marginTop: "150px",
    maxWidth: "500px",
    maxHeigth: "400px",
    padding:"40px",
    borderRadius:"20px",
    boxShadow: "0 0 20px 2px gray"
  }

  return (
    <div className="container col-4" style={style}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите Email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </Form.Group>
        <Button
          disabled={loading}
          variant="dark"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default AuthPage;
