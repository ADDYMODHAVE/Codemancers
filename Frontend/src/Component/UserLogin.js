import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { Context } from "../Store/Comtext";

const UserLogin = () => {
  const [Login, SetIsLogin] = useState(true);
  const [admin, setadmin] = useState(false);
  const ctx = useContext(Context);
  const onLoginHandler = () => {
    SetIsLogin(!Login);
  };

  const GetUserLoginSignupInfo = (e) => {
    e.preventDefault();
    let Userinfo = {
      email: e.target.email.value,
      password: e.target.password.value,
      admin,
    };
    if (Login) {
      ctx.loginUser(Userinfo);
    } else {
      SetIsLogin(!Login);
      ctx.signUser(Userinfo);
    }
    setadmin(false);
    e.target.email.value = "";
    e.target.password.value = "";
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle bg-warning rounded">
      <Form className="d-flex flex-column align-items-center text-center m-5" onSubmit={GetUserLoginSignupInfo}>
        <h1>{Login ? "LOGIN" : "SIGNUP"}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required name="password" />
        </Form.Group>
        {!Login && (
          <div>
            <input
              type="checkbox"
              onClick={() => {
                setadmin(!admin);
              }}
            />
            <span className="ms-2">Admin</span>
          </div>
        )}
        <Button variant="success" type="submit">
          {Login ? "LOGIN" : "SIGNUP"}
        </Button>
        {Login && (
          <Button variant="primary mt-2" type="submit" onClick={onLoginHandler}>
            CREATE ACCOUNT
          </Button>
        )}

        {!Login && (
          <Button variant="primary mt-2" type="submit" onClick={onLoginHandler}>
            BACK TO LOGIN
          </Button>
        )}
      </Form>
      <div className="text-danger text-center fw-bold">{ctx.error}</div>
    </div>
  );
};

export default UserLogin;
