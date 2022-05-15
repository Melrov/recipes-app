import React, { useCallback, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { styled as muiStyled } from "@mui/material/styles";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import useServerFetch from "../hooks/useServerFetch";
import { useNavigate } from "react-router-dom";

const Con = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 22vh;
`;
const Form = styled.form`
  background-color: #cdd6d0;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const InputCon = styled.div`
  margin-bottom: 15px;
  height: 75px;
`;
const CheckBoxCon = styled.div`
  position: relative;
  top: -13px;
`;
const Header = styled.h2`
  margin-left: auto;
  margin-right: auto;
`;
const SubmitButton = styled(Button)({
  backgroundColor: "#D6A99A",
  "&:hover": {
    backgroundColor: "#E16036",
  },
});
const Error = styled.p`
  color: rgb(255 151 151);
  background: rgb(201 22 22 / 85%);
  border: 1px solid rgb(239 45 45);
  padding: 6px;
  border-radius: 5px;
`;
const Register = styled.span`
  margin: 8px;
  cursor: pointer;
  color: rgb(205 66 20 / 73%);
  &:hover {
    color: rgb(205 66 20 / 100%);
  }
`;

function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [uError, setUError] = useState(null);
  const [pError, setPError] = useState(null);
  const [spError, setSpError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);
  const { signup: apiSignUp } = useServerFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userName.length < 4 || userName.length > 10) {
      setUError("Mush be between 4 and 10 characters");
    } else {
      setUError(null);
    }
    if (password.length < 4 || password.length > 10) {
      setPError("Mush be between 4 and 10 characters");
    } else {
      setPError(null);
    }
  }, [userName, password]);

  useEffect(() => {
    if (password !== secondPassword) {
      setSpError("Password does not match");
    } else {
      setSpError(null);
    }
  }, [password, secondPassword]);

  const signup = useCallback(
    async (e) => {
      e.preventDefault();
      if (!uError && !pError && !spError) {
        const res = await apiSignUp(userName, password);
        //console.log(res)
        if (res.data.success) {
          navigate("/login");
        } else {
          setShowError(true);
          setError(res.data.error);
        }
      }
      setShowError(true);
    },
    [userName, password, uError, pError, spError]
  );

  return (
    <Con>
      <Form onSubmit={signup}>
        {error && <Error>{error}</Error>}
        <Header>Sign Up</Header>
        <InputCon>
          <TextField
            style={{ width: "250px" }}
            error={showError && !!uError}
            label="Username"
            value={userName}
            helperText={showError ? uError : ""}
            onChange={(e) => setUserName(e.target.value)}
            //     InputProps={{
            //     endAdornment: <InputAdornment position="start">kg</InputAdornment>,
            //   }}
          />
        </InputCon>
        <InputCon>
          <TextField
            style={{ width: "250px" }}
            error={showError && !!pError}
            type="password"
            label="Password"
            value={password}
            helperText={showError ? pError : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputCon>

        <InputCon>
          <TextField
            style={{ width: "250px" }}
            error={!!spError}
            type="password"
            label="Repeat your password"
            value={secondPassword}
            helperText={!!spError ? spError : ""}
            onChange={(e) => setSecondPassword(e.target.value)}
          />
        </InputCon>

        <SubmitButton variant="contained" type="submit">
          Sign Up
        </SubmitButton>
        <p>
          Already have an account? <Register onClick={() => navigate("/login")}>Sign in</Register>
        </p>
      </Form>
    </Con>
  );
}

export default SignUp;
