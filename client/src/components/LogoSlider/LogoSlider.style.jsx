import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const Logos = styled.div`
  overflow: hidden;
  background: white;
  padding: 60px 0;
  position: relative;

    &:hover div {
    animation-play-state: paused;
  }

`;

export const Track = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scroll} 15s linear infinite;


  img {
    height: 100px;
    margin: 0 40px;
    flex-shrink: 0;
  }
`;

export const LogoImage = styled.div`
  width: 160px; 
  height: 100px;
  margin: 0 40px;
  flex-shrink: 0;
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
