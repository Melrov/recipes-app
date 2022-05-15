import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LinkCon = styled.div`
  display: flex;
  flex-direction: column;
`;

function Settings() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/login">Home</NavLink>
        </li>
        <li>
          <NavLink to="/settings/diet">Diet</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
