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
