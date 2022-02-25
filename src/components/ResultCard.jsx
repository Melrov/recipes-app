import React from "react";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";

const Card = styled.a`
  width: 312px;
  color: black;
  text-decoration: none;
  border-radius: 8px;
  height: fit-content;
  &:hover {
    text-decoration: underline;
    box-shadow: 0px 0px 16px 1px black;
  }
`;

const Img = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const TitleCon = styled.div`
  display: flex;
  align-items: center;
  background-color: blue;
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
  return (
    <Card href={"/search/" + item.id}>
      <Img src={item.image}></Img>
      <TitleCon>
        <Title>{item.title}</Title>
        <InfoIcon />
      </TitleCon>
    </Card>
  );
}

export default ResultCard;
