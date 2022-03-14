import React, { useContext } from "react";
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
  marginBottom: "5px !important",
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

function Login() {
  const { userName, setUserName, password, setPassword, uError, pError, error, showError, login } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Con>
      <Form onSubmit={login}>
        {error && <Error>{error}</Error>}
        <Header>Login</Header>
        <InputCon>
          <TextField
            style={{ width: "250px" }}
            error={showError && !!uError}
            label="User Name"
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

        <CheckBoxCon>
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </CheckBoxCon>
        <SubmitButton variant="contained" type="submit">
          Login
        </SubmitButton>
        <p>
          Don't have an account? <Register onClick={() => navigate("/signup")}>Register</Register>
        </p>
      </Form>
    </Con>
  );
}

export default Login;
