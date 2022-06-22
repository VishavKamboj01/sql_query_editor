import styled from "styled-components";

export const ResultContainer = styled.div`
  width: 79.7%;
  height: 38%;
  overflow: scroll;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  background-color: white;
  border-top: 1px solid #a0bcc2;

  @media only screen and (max-width: 1600px) {
    width: 79.2%;
  }

  @media only screen and (max-width: 1150px) {
    width: 78.7%;
  }
`;
