import styled from "styled-components";

export const SideBarContainer = styled.div`
  height: 100vh;
  width: 300px;
  background: lightgray;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Databases = styled.div`
  width: 100%;
  height: 50%;
  background: white;
`;

export const Tables = styled.div`
  width: 100%;
  height: 50%;
  background: white;
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  padding: 3px 0;
  background: rgba(128, 128, 128, 0.7);
`;

export const Bar = styled.div`
  width: 85%;
  height: 30px;
  background: rgba(128, 128, 128, 0.2);
  color: black;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding-left: 5px;
  cursor: pointer;

  transition: 0.5s ease;

  :hover {
    width: 98%;
  }
`;

export const Text = styled.p`
  font-size: 1.2rem;
  color: black;
  margin: 0;
  padding: 0;
  margin-left: 5px;
`;
