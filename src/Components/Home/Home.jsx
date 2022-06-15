import React from "react";
import {
  BaseContainer,
  Button,
  ButtonsContainer,
  TopBarContainer,
} from "./homeStyles";
import Editor from "../Editor/Editor";
import Output from "../Editor/Output";
export default function Home() {
  return (
    <BaseContainer>
      <TopBarContainer>
        SQL COMPILER
        <ButtonsContainer>
          <Button>IMPORT</Button>
          <Button>SAVE</Button>
          <Button>RUN</Button>
        </ButtonsContainer>
      </TopBarContainer>
      <Editor>
        <Output />
      </Editor>
    </BaseContainer>
  );
}
