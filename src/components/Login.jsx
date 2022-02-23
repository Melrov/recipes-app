import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { styled as muiStyled } from '@mui/material/styles';
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const Con = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 30vh;
`;
const Form = styled.form`
  background-color: #CDD6D0;
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
    '&:hover':{
        backgroundColor: "#E16036"
    }
})

function Login() {
  const {
    userName,
    setUserName,
    password,
    setPassword,
    uError,
    pError,
    showError,
    login,
  } = useContext(UserContext);
  return (
    <Con>
      <Form onSubmit={login}>
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
      </Form>
    </Con>
  );
}

export default Login;
