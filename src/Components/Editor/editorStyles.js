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
  height: 100%;
  background-color: white;
  text-align: left;
  padding: 5px;
  font-size: 1.3rem;
  border: 0;
  outline: none;
`;

export const LineMarker = styled.textarea`
  height: 100%;
  width: 30px;
  color: blue;
  padding-top: 5px;
  padding-left: 5px;
  font-size: 1.3rem;
  outline: none;
  border: 0;
  border-right: 1px solid gray;
  overflow-y: hidden;
`;
