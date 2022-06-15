import styled from "styled-components";

export const BaseContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgrey;
  overflow-x: hidden;
`;

export const TopBarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: black;
  opacity: 0.7;
  color: white;
  display: flex;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  margin-left: 100px;
`;

export const Button = styled.div`
  width: 90px;
  height: 35px;
  cursor: pointer;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(128, 128, 128, 0.7);
  border-radius: 20px;
`;
