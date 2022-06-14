import React, { useState } from "react";
import {
  CodeArea,
  CodeAreaContainer,
  EditorContainer,
  LineMarker,
} from "./editorStyles";

export default function Editor() {
  const [markerValue, setMarkerValue] = useState("1 2 ");
  const [counter, setCounter] = useState(3);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let value = markerValue;
      setCounter(counter + 1);
      value = value.concat(counter + " ");
      setMarkerValue(value);
    }
  };

  return (
    <EditorContainer>
      <CodeAreaContainer>
        <LineMarker readOnly disabled value={markerValue} />
        <CodeArea type="textarea" onKeyDown={handleKeyDown} />
      </CodeAreaContainer>
    </EditorContainer>
  );
}
