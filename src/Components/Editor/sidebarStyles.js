import styled from "styled-components";

export const SideBarContainer = styled.div`
  height: 100vh;
  width: 350px;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Databases = styled.div`
  width: 100%;
  height: 50%;
  background: rgba(119, 151, 182, 0.1);
`;

export const Tables = styled.div`
  width: 100%;
  height: 50%;
  background: rgba(119, 151, 182, 0.1);
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: #001d6e;
  padding: 3px 0;
  background: rgba(177, 175, 206, 0.2);
`;

export const Bar = styled.div`
  width: 85%;
  height: 30px;
  background: rgba(255, 255, 255);
  box-shadow: 0 0 5px #eee;

  margin-top: 5px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding-left: 5px;
  cursor: pointer;
  border-radius: 20px;

  transition: 0.5s ease;

  :hover {
    width: 100%;
  }
`;

export const Text = styled.p`
  font-size: 1.2rem;
  color: #1a132f;
  margin: 0;
  padding: 0;
  margin-left: 5px;
`;
