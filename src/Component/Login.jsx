import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthUser from "../AuthUser";

const LOGIN_URL = "/login";

const Login = () => {
  const {http,setToken} = AuthUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post(LOGIN_URL, {
        email: user,
        password: pwd,
      });
      const data = response?.data.data;
      console.log(data);
      setToken(data.user, data.token);
      setUser("");
      setPwd("");
      navigate("/task");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No server response.");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else {
        setErrMsg("Login Fail.");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="main-section">
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <p>
        Need an Account? <br />
        <Link to="/signup">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
