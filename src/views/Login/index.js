import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import Logo from "../../assets/img/logoUtama.svg";
import Swal from "sweetalert2";
import { loginUser, checkLogin } from "action/AuthAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginLoading } = props;

  useEffect(() => {
    props.dispatch(checkLogin(navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangepassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      props.dispatch(loginUser(email, password, navigate));
      console.log(email, password);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Maaf, Semua data harus di isi",
        showConfirmButton: false,
        confirmButtonColor: "#33b4b7",
        timer: 2000,
      });
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={4}>
        <img src={Logo} className="rounded mx-auto d-block" alt="logo" />
        <Card>
          <CardHeader tag="h4">Login</CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Masukkan email"
                  onChange={handleChangeEmail}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Masukkan Password"
                  onChange={handleChangepassword}
                />
              </FormGroup>

              {loginLoading ? (
                <Button
                  color="primary"
                  type="submit"
                  className="float-right"
                  disabled
                >
                  <Spinner size="sm" color="light" /> Loading
                </Button>
              ) : (
                <Button color="primary" type="submit" className="float-right">
                  Login
                </Button>
              )}
            </form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,

  checkLoginLoading: state.AuthReducer.checkLoginLoading,
  checkLoginResult: state.AuthReducer.checkLoginResult,
  checkLoginError: state.AuthReducer.checkLoginError,
});

export default connect(mapStateToProps)(Login);
