import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function doLogin() {
    try {
      const axiosResponse = await axios.post(
        "http://192.168.0.72:3001/users/login",
        {
          username: username,
          password: password,
        }
      );
      localStorage.setItem("token", axiosResponse.data.token);
      setToken(axiosResponse.data.token);
      history.push("/dashboard");
    } catch (error) {}
  }
  // useEffect(() => {

  // })
  return (
    <>
      <div className="container-fluid">
        <p className="text-muted mb-4">
          Create a login split page using Bootstrap 4.
        </p>
        <form>
          <div>
            <input
              id="inputEmail"
              type="email"
              placeholder="Email address"
              onInput={($event) => {
                setUsername($event.currentTarget.value);
              }}
            ></input>
          </div>
          <div>
            <input
              id="inputPassword"
              type="password"
              placeholder="Password"
              onInput={($event) => {
                // console.log($event);
                setPassword($event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input id="customCheck1" type="checkbox" checked></input>
            <label>Remember password</label>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
            onClick={doLogin}
          >
            Sign in
          </button>
          <div>
            <p>
              Snippet by{" "}
              <a href="https://bootstrapious.com/snippets">
                <u>Boostrapious</u>
              </a>
            </p>
          </div>
        </form>
      </div>
    </>

    // <Grid>
    //   <Row></Row>
    //   <Row>
    //     <Column></Column>
    //     <Column>
    //       <h3 className="display-4">Time & Attendance</h3>
    //       <p className="text-muted mb-4">Please login to start</p>
    //       <Form>
    //         <div>
    //           <div style={{ marginBottom: "2rem" }}>
    //             <TextInput
    //               required={true}
    //               id="test2"
    //               invalidText="A valid value is required"
    //               placeholder="Username"
    //               onInput={($event) => {
    //                 setUsername($event.target.value);
    //               }}
    //               autoFocus
    //             />
    //           </div>
    //           <div style={{ marginBottom: "2rem" }}>
    //             <TextInput
    //               id="inputPassword"
    //               type="password"
    //               placeholder="Password"
    //               required={true}
    //               onInput={($event) => {
    //                 setPassword($event.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="custom-control custom-checkbox mb-3">
    //             <input
    //               id="customCheck1"
    //               type="checkbox"
    //               checked
    //               className="custom-control-input"
    //             />
    //             <label form="customCheck1" className="custom-control-label">
    //               Remember password
    //             </label>
    //           </div>
    //           <Button type="button" onClick={doLogin}>
    //             Sign in
    //           </Button>
    //           <div className="text-center d-flex justify-content-between mt-4">
    //             {/* <p>
    //                     Snippet by{" "}
    //                     <a
    //                       href="https://bootstrapious.com/snippets"
    //                       className="font-italic text-muted"
    //                     >
    //                       <u>Boostrapious</u>
    //                     </a>
    //                   </p> */}
    //           </div>
    //         </div>
    //       </Form>
    //     </Column>
    //     <Column></Column>
    //   </Row>
    //   <Row></Row>
    // </Grid>
  );
}

export default Login;
