import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Grid, Row, Column, TextInput, Form, Button } from "carbon-components-react";
function Login() {
  const history = useHistory();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function doLogin() {
    try {
      const token = await axios.get("http://localhost:3001/user/login", {
        params: { username: username, password: password },
      });
      localStorage.setItem("token", token);
      setToken(token);
      history.push("/dashboard");
    } catch (error) {}
  }
  // useEffect(() => {

  // })
  return (
    <Grid>
      <Row></Row>
      <Row>
        <Column></Column>
        <Column>
          <h3 className="display-4">Time & Attendance</h3>
          <p className="text-muted mb-4">Please login to start</p>
          <Form>
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <TextInput
                  required={true}
                  id="test2"
                  invalidText="A valid value is required"
                  placeholder="Username"
                  onInput={($event) => {
                    setUsername($event.target.value);
                  }}
                  autoFocus
                />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <TextInput
                  id="inputPassword"
                  type="password"
                  placeholder="Password"
                  required={true}
                  onInput={($event) => {
                    setPassword($event.target.value);
                  }}
                />
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  id="customCheck1"
                  type="checkbox"
                  checked
                  className="custom-control-input"
                />
                <label form="customCheck1" className="custom-control-label">
                  Remember password
                </label>
              </div>
              <Button
                type="button"
                onClick={doLogin}
              >
                Sign in
              </Button>
              <div className="text-center d-flex justify-content-between mt-4">
                {/* <p>
                        Snippet by{" "}
                        <a
                          href="https://bootstrapious.com/snippets"
                          className="font-italic text-muted"
                        >
                          <u>Boostrapious</u>
                        </a>
                      </p> */}
              </div>
            </div>
          </Form>
        </Column>
        <Column></Column>
      </Row>
      <Row></Row>
    </Grid>
  );
}

export default Login;
