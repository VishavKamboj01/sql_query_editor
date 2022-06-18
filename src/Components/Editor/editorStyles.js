import styled from "styled-components";

export const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const CodeAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const CodeArea = styled.textarea`
  width: 100%;
  height: 60%;
  background-color: white;
  text-align: left;
  padding: 5px;
  font-size: 1.2rem;
  border: 0;
  outline: none;
  overflow: scroll;

  ::placeholder {
    opacity: 0.5;
    font-style: italic;
  }

  ::selection {
    background-color: white;
    color: orange;
  }
`;

export const CodeDiv = styled.div`
  width: 100%;
  height: 60%;
  background-color: white;
  text-align: left;
  padding: 5px;
  font-size: 1.2rem;
  border: 0;
  outline: none;
  overflow: scroll;
`;

export const LineMarker = styled.textarea`
  height: 100%;
  width: 30px;
  color: black;
  opacity: 0.6;
  padding-top: 5px;

  font-size: 1.2rem;
  outline: none;
  border: 0;
  border-right: 1px solid gray;
  overflow-y: hidden;
`;

export const InputDiv = styled.div`
  width: 100%;
  height: 28px;
  background-color: white;
  border: 0;
  outline: none;

  :focus {
    background: rgba(128, 128, 128, 0.1);
  }
`;

export const SuggesstionBox = styled.div`
  width: 300px;
  position: absolute;
  top: 30px;
  display: none;
  z-index: 1;
  box-shadow: 0 0 5px lightgray;
`;

export const Suggesstion = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
  border-bottom: 1px solid lightgray;
  padding-left: 10px;
`;
