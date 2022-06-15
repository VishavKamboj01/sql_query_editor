import React, { useState } from "react";
import {
  BaseContainer,
  Button,
  ButtonsContainer,
  TopBarContainer,
} from "./homeStyles";
import Editor from "../Editor/Editor";
export default function Home() {
  const [runClicked, setRunClicked] = useState(false);

  const handleOutputComplete = () => {
    setRunClicked(false);
  };

  return (
    <BaseContainer>
      <TopBarContainer>
        SQL COMPILER
        <ButtonsContainer>
          <Button>IMPORT</Button>
          <Button>SAVE</Button>
          <Button
            onClick={() => {
              setRunClicked(true);
            }}
          >
            RUN
          </Button>
        </ButtonsContainer>
      </TopBarContainer>
      <Editor runClicked={runClicked} onComplete={handleOutputComplete} />
    </BaseContainer>
  );
}
