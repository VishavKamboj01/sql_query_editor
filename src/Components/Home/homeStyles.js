import styled from "styled-components";

export const BaseContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const TopBarContainer = styled.div`
  width: 100%;
  height: 70px;
  //background: rgba(1, 0, 56, 0.9);
  background: #1a132f;
  box-shadow: 0 0 10px #eee;
  color: white;
  display: flex;
  align-items: center;
  font-family: "Source code pro";
`;

export const AtlanLogo = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 23px;
  object-fit: cover;
  margin-right: 15px;
  margin-left: 5px;
`;

export const ButtonsContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  margin-left: 120px;
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
  border-radius: 30px;
`;

export const AutoCompletion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`;

export const Indicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  transition: 0.3s ease;
  cursor: pointer;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
  margin-left: 10px;
  color: white;
`;
