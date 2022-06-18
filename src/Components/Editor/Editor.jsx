import React, { useEffect, useRef, useState } from "react";
import {
  CodeArea,
  CodeAreaContainer,
  CodeDiv,
  EditorContainer,
  InputDiv,
  LineMarker,
  Suggesstion,
  SuggesstionBox,
} from "./editorStyles";
import Output from "./Output";
import Sidebar from "./Sidebar";
import {
  BaseContainer,
  Button,
  ButtonsContainer,
  TopBarContainer,
} from "../Home/homeStyles";

import { getWords, hasWord } from "../../Trie/Trie";

const LENGTH = 10;
const clamp = (min, max, val) => Math.max(min, Math.min(val, max));

export default function Editor() {
  const [markerValue, setMarkerValue] = useState("1  ");
  const [lineCounter, setLineCounter] = useState(1);
  const [code, setCode] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [suggesstions, setSuggesstions] = useState([]);

  const [prevTags, setPrevTags] = useState([]);
  const [data] = useState([...Array(LENGTH).keys()]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleKeyPress = (index, event) => {
    let code = event.currentTarget.innerText;

    const key = event.key;

    // const tags = prevTags;
    // if (!tags.includes(inputRefs.current[index].childNodes))
    //   tags.push(inputRefs.current[index].childNodes);
    // setPrevTags(tags);

    if (key === "Enter" || key === "ArrowDown") {
      event.preventDefault();

      moveCursor(index + 1);
      incrementMarkerValue(index + 2);
    } else if (key === "ArrowUp" || (key === "Backspace" && code === "")) {
      if (index !== 0) {
        moveCursor(index - 1);
        decrementMarkerValue(index + 1);
      }
    } else if (key === "Tab") {
      event.preventDefault();
      const words = code.split(" ");

      // const tag = "<span style='color: orange'>hello</span>";
      // event.currentTarget.innerHTML = tag;

      if (suggesstions.length > 0) {
        //code = code.replace(words[words.length - 1], suggesstions[0]);
        const lastIndex = code.lastIndexOf(words[words.length - 1]);

        code = code.substring(0, lastIndex) + suggesstions[0];
      }
      event.currentTarget.innerText = code;
      setSuggesstions([]);
      updateCursorPosition(index, event.currentTarget);
    }
  };

  const updateSuggesstions = (event, index) => {
    alignSuggesstionBox(index, event);
    const code = event.currentTarget.innerText;
    const words = code.split(" ");

    if (code === "" || hasWord(words[words.length - 1].trim())) {
      setSuggesstions([]);
      return;
    }
    const result = getWords(words[words.length - 1].trim());

    setSuggesstions(result);
  };

  const alignSuggesstionBox = (index, event) => {
    const text = event.currentTarget.innerText;

    const ele = document.getElementById("show-on-focus");
    ele.style.display = "block";
    const margin = 30 * (index + 1);
    ele.style.top = margin + "px";
    ele.style.left = text.length * 7 + "px";
  };

  const updateCursorPosition = (index, target) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    target.focus();
  };

  const moveCursor = (index) => {
    const nextIndex = clamp(0, data.length - 1, index);
    inputRefs.current[nextIndex].focus();
  };

  const incrementMarkerValue = (index) => {
    let value = markerValue;
    value = value + "" + index + "  ";
    setMarkerValue(value);
  };

  const decrementMarkerValue = (index) => {
    let value = markerValue;
    value = value.replace(index + "  ", "");
    setMarkerValue(value);
  };

  const handleRunClicked = () => {
    if (code !== "") setShowOutput(true);
  };

  const reduceLines = () => {
    let value = markerValue;
    const index = value.indexOf(lineCounter.toString());

    value = value.slice(0, index);
    setMarkerValue(value);
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
            {/* <CodeArea
              type="textarea"
              onKeyDown={handleKeyDown}
              onChange={handleCodeChange}
              placeholder="Enter your query here..."
            /> */}
            <CodeDiv>
              {data.map((data, index) => (
                <div key={index} id="div" style={{ position: "relative" }}>
                  <InputDiv
                    className="input"
                    contentEditable={true}
                    onKeyDown={(event) => handleKeyPress(index, event)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    onInput={(event) => updateSuggesstions(event, index)}
                  />

                  <SuggesstionBox id="show-on-focus">
                    {suggesstions.map((item) => (
                      <Suggesstion key={item}>
                        {item}
                        {"  "}
                        <p
                          style={{
                            color: "black",
                            opacity: 0.3,
                            margin: 0,
                            display: "inline",
                            justifySelf: "flex-end",
                          }}
                        >
                          (Tab to complete)
                        </p>
                      </Suggesstion>
                    ))}
                  </SuggesstionBox>
                </div>
              ))}
            </CodeDiv>

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
