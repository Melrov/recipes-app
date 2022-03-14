import React from "react";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  width: 190px;
  color: black;
  text-decoration: none;
  border-radius: 8px;
  height: fit-content;
  font-size: 13px;
  margin: 7px;
  &:hover {
    text-decoration: underline;
    box-shadow: 0px 0px 16px 1px black;
  }
`;

const Img = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 190px;
`;
const TitleCon = styled.div`
  display: flex;
  align-items: center;
  background-color: #e16036;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-right: 5px;
  margin: 0px;
  margin-top: -4px;
`;
const Title = styled.h3`
  margin: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 5px;
  padding-left: 9px;
`;

function ResultCard({ item }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate("/search/" + item.spoon_id)}>
      <Img src={item.image}></Img>
      <TitleCon>
        <Title>{item.title}</Title>
        <InfoIcon />
      </TitleCon>
    </Card>
  );
}

export default ResultCard;
