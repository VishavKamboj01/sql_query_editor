import React, { useEffect, useState } from "react";
import {
  CodeArea,
  CodeAreaContainer,
  CodeDiv,
  EditorContainer,
  LineMarker,
} from "./editorStyles";
import Output from "./Output";
import Sidebar from "./Sidebar";
import {
  BaseContainer,
  Button,
  ButtonsContainer,
  TopBarContainer,
} from "../Home/homeStyles";

import { getWords } from "../../Trie/Trie";

export default function Editor() {
  const [markerValue, setMarkerValue] = useState("1  ");
  const [lineCounter, setLineCounter] = useState(1);
  const [code, setCode] = useState("");
  const [enterCount, setEnterCount] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const handleRunClicked = () => {
    if (code !== "") setShowOutput(true);
  };

  const reduceLines = () => {
    let value = markerValue;
    const index = value.indexOf(lineCounter.toString());

    value = value.slice(0, index);
    setMarkerValue(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEnterCount(enterCount + 1);

      if (lineCounter >= 1) {
        let val = markerValue;
        val = val.concat(lineCounter + 1 + " ");
        setMarkerValue(val);
      }
    }
  };

  const handleCodeChange = (event) => {
    const value = event.currentTarget.value;

    const editorWords = value.split(" ");
    const words = getWords(editorWords[editorWords.length - 1]);

    if (editorWords[editorWords.length - 1].length !== 0) console.log(words);

    const lines = value.split(/\r|\r\n|\n/);
    setLineCounter(lines.length);

    if (lineCounter > lines.length) reduceLines();
    setCode(value);
  };

  return (
    <EditorContainer>
      <TopBarContainer>
        SQL COMPILER
        <ButtonsContainer>
          <Button>IMPORT</Button>
          <Button>SAVE</Button>
          <Button onClick={handleRunClicked}>RUN</Button>
        </ButtonsContainer>
      </TopBarContainer>
      <CodeAreaContainer>
        <Sidebar />
        <div style={{ width: "100%", heigth: "100%", display: "flex" }}>
          <LineMarker readOnly disabled value={markerValue} draggable={false} />
          <div
            style={{
              width: "100%",
              heigth: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CodeArea
              type="textarea"
              onKeyDown={handleKeyDown}
              onChange={handleCodeChange}
              placeholder="Enter your query here..."
            />

            {showOutput ? (
              <Output query={code} nothing={false} />
            ) : (
              <Output nothing={true} query={code} />
            )}
          </div>
        </div>
      </CodeAreaContainer>
    </EditorContainer>
  );
}
