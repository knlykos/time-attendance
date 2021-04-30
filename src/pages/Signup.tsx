import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router";
import { serverUrl } from "./../config";

function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const doSignup = async () => {
    try {
      const axiosResponse = await axios.post(`${serverUrl}/users/signup`, {
        email: email,
        username: username,
        password: password,
      });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeEmail = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmail(val);
  };
  const onChangeUsername = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setUsername(val);
  };

  const onChangePassword = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setPassword(val);
  };

  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={onChangeEmail} value={email} id={"email"}></input>
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={onChangeUsername}
          value={username}
          id={"username"}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={onChangePassword}
          value={password}
          id={"password"}
        ></input>
      </div>
      <div>
        <button onClick={doSignup}>Sign Up</button>
      </div>
    </>
  );
}

export default SignUp;
