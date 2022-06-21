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
  background-color: #f9fafc;
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
  color: #a0bcc2;
  opacity: 0.6;
  padding-top: 3px;

  font-size: 1.17rem;
  outline: none;
  border: 0;
  border-right: 1px solid #a0bcc2;
  overflow-y: hidden;
`;

export const InputDiv = styled.div`
  width: 100%;
  height: 28px;
  background-color: white;
  border: 0;
  color: black;
  opacity: 0.8;
  outline: none;
  caret-color: darkgray;
  padding-left: 5px;
  font-family: "Source code pro";
  font-size: 1.1rem;

  :focus {
    background: rgba(66, 194, 255, 0.1);
    border-radius: 5px;
  }

  ::selection {
    background: #b7e5dd;
  }
`;

export const SuggesstionBox = styled.div`
  width: 300px;
  max-height: 400px;
  position: absolute;
  top: 30px;
  display: none;
  z-index: 1;
  box-shadow: 0 1px 7px #a0bcc2;
  border-radius: 10px;
  overflow: hidden;
  font-family: "Source code pro";
`;

export const Suggesstion = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
  border-bottom: 1px solid;
  border-color: rgba(160, 188, 194, 0.3);
  padding-left: 10px;
  opacity: 0.7;
`;
