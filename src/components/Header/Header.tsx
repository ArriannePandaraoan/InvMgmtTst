import React from "react";
import styled from "styled-components";
import BgImage from "../../assets/images/bg-title.png";
import Header from "../../assets/images/title-chalk-font.png";

const StyledContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
`;

const StyledBg = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  z-index: -1;
`;

const TitleChalkFont = styled.img`
  width: 20%;
  height: auto;
  margin-top: 2%;
  position: absolute;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%);
`;

const Component = () => {
  return (
    <>
      <StyledContainer>
        <StyledBg src={BgImage} />
        <TitleChalkFont src={Header} />
      </StyledContainer>
    </>
  );
};

export default Component;
