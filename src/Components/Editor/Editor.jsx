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
  AtlanLogo,
  AutoCompletion,
  BaseContainer,
  Button,
  ButtonsContainer,
  Indicator,
  Text,
  TopBarContainer,
} from "../Home/homeStyles";
import { FaPlay, FaDownload } from "react-icons/fa";
import logo from "../../images/atlan.png";
import { getWords, hasWord } from "../../Trie/Trie";
import { CSVLink } from "react-csv";
import { executeQuery, table1 } from "../../Tables/tables";
import { Dropdown } from "react-bootstrap";

const LENGTH = 18;
const clamp = (min, max, val) => Math.max(min, Math.min(val, max));

export default function Editor() {
  const [textSelection, setTextSelection] = useState("");
  const [markerValue, setMarkerValue] = useState("1  ");
  const [tableData, setTableData] = useState([]);
  const [code, setCode] = useState("");
  const [query, setQuery] = useState("");
  const [currentRef, setCurrentRef] = useState(0);
  const [indicatorClick, setIndicatorClick] = useState(false);

  const [suggesstions, setSuggesstions] = useState([]);
  const [data] = useState([...Array(LENGTH).keys()]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
    // let query = "select * from customer;";
    // inputRefs.current[0].innerHTML = changeColor(query);
    // updateCursorPosition(inputRefs.current[0]);
  }, []);

  const handleKeyPress = (index, event) => {
    let code = event.currentTarget.innerText;
    let tempCode = code;
    const key = event.key;

    if (textSelection !== "") {
      event.currentTarget.innerHTML = "";
    }

    if (key === "Enter" || key === "ArrowDown") {
      event.preventDefault();
      setCurrentRef(index + 1);
      moveCursor(index + 1);
      incrementMarkerValue(index + 2);

      if (suggesstions.length !== 0) {
        setSuggesstions([]);
      }

      //Insert a tab char
      if (!code.endsWith(";") && code.trim() !== "") {
        var editor = inputRefs.current[index + 1];
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (key === "ArrowUp" || (key === "Backspace" && code === "")) {
      if (index !== 0) {
        moveCursor(index - 1);
        decrementMarkerValue(index + 1);
        updateCursorPosition(inputRefs.current[index - 1]);
        setCurrentRef(index - 1);
      }
    } else if (key === "Tab") {
      event.preventDefault();
      const words = code.split(" ");

      if (suggesstions.length > 0) {
        //code = code.replace(words[words.length - 1], suggesstions[0]);
        const lastIndex = code.lastIndexOf(words[words.length - 1]);

        code = code.substring(0, lastIndex) + suggesstions[0];
      }
      event.currentTarget.innerText = code;

      setSuggesstions([]);
    }
    if (
      key !== "Enter" &&
      key !== "ArrowDown" &&
      key !== "ArrowUp" &&
      key !== "Backspace" &&
      key !== "ArrowRight" &&
      key !== "ArrowLeft"
    ) {
      //Handling space issue
      let position = cursorPosition();
      tempCode = tempCode.trim();

      if (position + 2 < tempCode.length) {
        return;
      }

      event.currentTarget.innerHTML = changeColor(code);
      updateCursorPosition(event.currentTarget);
    }
  };

  const cursorPosition = () => {
    const sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    const pos = sel.toString().length;
    if (sel.anchorNode != undefined) sel.collapseToEnd();
    return pos;
  };

  const changeColor = (text) => {
    let words = text.split(" ");
    let coloredCode = "";
    for (let word of words) {
      if (hasWord(word.trim())) {
        coloredCode +=
          "<span style='color: #FC4F4F; font-weight:600; font-style:italic' > " +
          word +
          " </span>";
      } else if (word.startsWith('"')) {
        let removed = false;
        if (word.endsWith(";")) {
          word = word.replace(";", "");
          removed = true;
        }

        coloredCode +=
          "<span style='color: #4E9F3D; font-weight:500;' > " +
          word +
          " </span>";

        if (removed) coloredCode += ";";
      } else coloredCode += " " + word;
    }
    return coloredCode;
  };

  const updateSuggesstions = (event, index) => {
    if (indicatorClick) return;
    alignSuggesstionBox(index, event);
    const code = event.currentTarget.innerText.trim();
    const words = code.split(" ");

    if (code === "" || hasWord(words[words.length - 1].trim())) {
      setSuggesstions([]);
      return;
    }
    const result = getWords(words[words.length - 1].trim().toLowerCase());

    setSuggesstions(result);
    setCode(code);
  };

  const alignSuggesstionBox = (index, event) => {
    const text = event.currentTarget.innerText;

    const ele = document.getElementById("show-on-focus");
    ele.style.display = "block";
    const margin = 30 * (index + 1);
    ele.style.top = margin + "px";
    ele.style.left = text.length * 7 + "px";
  };

  const updateCursorPosition = (target) => {
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
    let query = "";
    for (let i = 0; i < inputRefs.current.length; i++) {
      // inputRefs.current[i].innerHTML = inputRefs.current[i].innerHTML.replace(
      //   /\&nbsp;/g,
      //   ""
      // );
      let data = inputRefs.current[i].innerText;
      query += data;
    }

    setQuery(query);
  };

  const handleCSVClick = () => {
    if (query === "") return;
    let rows = [];
    let table = executeQuery(query);
    rows.push(table[0]); //headers

    for (let row of table[1]) rows.push(row);

    setTableData(rows);
  };

  const handleMenuItemClick = (item) => {
    inputRefs.current[currentRef].innerHTML = changeColor(
      item.target.innerText
    );
  };

  return (
    <EditorContainer>
      <TopBarContainer>
        <AtlanLogo src={logo} />
        SQL COMPILER
        <ButtonsContainer>
          <Button onClick={handleRunClicked} style={{ background: "#14C38E" }}>
            <FaPlay style={{ marginRight: 5 }} size={20} color="white" />
            RUN
          </Button>
          <CSVLink
            style={{
              textDecoration: "none",
              width: 90,
              height: 35,
              background: `${query.length !== 0 ? "#F66B0E" : "#C84B31"}`,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginRight: 20,
              cursor: `${query.length !== 0 ? "pointer" : "not-allowed"}`,
            }}
            data={tableData}
            onClick={handleCSVClick}
            filename={"table-data"}
          >
            <FaDownload style={{ marginRight: 5 }} size={18} color="white" />
            CSV
          </CSVLink>
        </ButtonsContainer>
        <Dropdown style={{ marginLeft: 50 }}>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: 0,
              borderRadius: 20,
            }}
          >
            Query Set
          </Dropdown.Toggle>

          <Dropdown.Menu onClick={handleMenuItemClick}>
            <Dropdown.Item>select * from customer;</Dropdown.Item>
            <Dropdown.Item>
              select first_name, last_name from customer where state = "OH";
            </Dropdown.Item>
            <Dropdown.Item>select * from rental;</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <AutoCompletion>
          <Indicator
            style={{
              background: `${indicatorClick ? "#F32424" : "#54e346"}`,
              boxShadow: `${
                indicatorClick ? "0 0 20px #F32424" : "0 0 20px#54e346"
              }`,
            }}
            onClick={() =>
              indicatorClick
                ? setIndicatorClick(false)
                : setIndicatorClick(true)
            }
          />
          <Text>Auto Completion</Text>
        </AutoCompletion>
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
            <CodeDiv
              contentEditable={textSelection !== ""}
              suppressContentEditableWarning={true}
            >
              {data.map((data, index) => (
                <div key={index} id="div" style={{ position: "relative" }}>
                  <InputDiv
                    className="input"
                    contentEditable={true}
                    onKeyDown={(event) => handleKeyPress(index, event)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    onInput={(event) => updateSuggesstions(event, index)}
                    spellCheck={false}
                    onMouseMoveCapture={() =>
                      setTextSelection(window.getSelection().toString())
                    }
                    onMouseUp={() => setTextSelection("")}
                  />

                  <SuggesstionBox id="show-on-focus">
                    {suggesstions.map((item) => (
                      <Suggesstion key={item}>
                        {item}
                        {"  "}
                        <p
                          style={{
                            color: "#A0BCC2",
                            opacity: 0.6,
                            margin: 0,
                            display: "inline",
                            fontFamily: "monospace",
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

            <Output query={query} />
          </div>
        </div>
      </CodeAreaContainer>
    </EditorContainer>
  );
}
