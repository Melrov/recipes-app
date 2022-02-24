import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "styled-components";

const Con = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
`;
const Form = styled.div`
  display: flex;
  justify-content: center;
`;

function DietMinMax({ name, measurement, value, setter }) {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    if (!isNaN(event.target.value.charAt(event.target.value.length - 1))) {
      let curr = [...value];
      curr[prop] = parseInt(event.target.value);
      setter(curr);
    }
  };
  return (
    <Con>
      <Title>{name}</Title>
      <Form>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={value[0]}
            onChange={handleChange(0)}
            endAdornment={
              <InputAdornment position="end">{measurement}</InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
          <FormHelperText id="outlined-weight-helper-text">
            {"Min-" + name}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={value[1]}
            onChange={handleChange(1)}
            endAdornment={
              <InputAdornment position="end">{measurement}</InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
          <FormHelperText id="outlined-weight-helper-text">
            {"Max-" + name}
          </FormHelperText>
        </FormControl>
      </Form>
    </Con>
  );
}

export default DietMinMax;
