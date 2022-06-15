import React, { useEffect, useState } from "react";
import {
  CodeArea,
  CodeAreaContainer,
  EditorContainer,
  LineMarker,
} from "./editorStyles";
import Sidebar from "./Sidebar";

export default function Editor() {
  const [markerValue, setMarkerValue] = useState("1  ");
  const [lineCounter, setLineCounter] = useState(2);
  const [code, setCode] = useState("");
  const [enterCount, setEnterCount] = useState(0);

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
    const lines = value.split(/\r|\r\n|\n/);
    setLineCounter(lines.length);

    if (lineCounter > lines.length) reduceLines();
    setCode(value);
  };

  return (
    <EditorContainer>
      <CodeAreaContainer>
        <Sidebar />
        <LineMarker readOnly disabled value={markerValue} />
        <CodeArea
          type="textarea"
          onKeyDown={handleKeyDown}
          onChange={handleCodeChange}
        />
      </CodeAreaContainer>
    </EditorContainer>
  );
}
