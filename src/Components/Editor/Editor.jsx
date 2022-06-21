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
import Output, { prepareData } from "./Output";
import Sidebar from "./Sidebar";
import {
  AtlanLogo,
  BaseContainer,
  Button,
  ButtonsContainer,
  TopBarContainer,
} from "../Home/homeStyles";
import { FaPlay, FaDownload } from "react-icons/fa";
import logo from "../../images/atlan.png";
import { getWords, hasWord } from "../../Trie/Trie";
import { CSVLink } from "react-csv";
import { table1 } from "../../Tables/tables";
import { Dropdown } from "react-bootstrap";

const LENGTH = 18;
const clamp = (min, max, val) => Math.max(min, Math.min(val, max));

export default function Editor() {
  const [markerValue, setMarkerValue] = useState("1  ");
  const [tableData, setTableData] = useState("");
  const [code, setCode] = useState("");
  const [query, setQuery] = useState("");
  const [currentRef, setCurrentRef] = useState(0);
  const [runClicked, setRunClicked] = useState(false);
  const [suggesstions, setSuggesstions] = useState([]);
  const [data] = useState([...Array(LENGTH).keys()]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
    let query = "select * from customer;";

    inputRefs.current[0].innerHTML = changeColor(query);
    updateCursorPosition(inputRefs.current[0]);
  }, []);

  const handleKeyPress = (index, event) => {
    let code = event.currentTarget.innerText;
    const key = event.key;

    if (key === "Enter" || key === "ArrowDown") {
      event.preventDefault();
      setCurrentRef(index + 1);
      moveCursor(index + 1);
      incrementMarkerValue(index + 2);

      //Insert a tab char
      if (!event.currentTarget.innerText.endsWith(";")) {
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
      event.currentTarget.innerHTML = changeColor(code);
      updateCursorPosition(event.currentTarget);
    }
  };

  const changeColor = (text) => {
    let words = text.split(" ");
    let coloredCode = "";
    for (let word of words) {
      if (hasWord(word.trim())) {
        coloredCode +=
          "<span style='color: #FC4F4F; font-weight:500;' > " +
          word +
          " </span>";
      } else coloredCode += " " + word;
    }
    return coloredCode;
  };

  const updateSuggesstions = (event, index) => {
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
      inputRefs.current[i].innerHTML = inputRefs.current[i].innerHTML.replace(
        /\&nbsp;/g,
        ""
      );
      let data = inputRefs.current[i].innerText;
      query += data;
    }

    setQuery(query);
    setRunClicked(true);
  };

  const handleCSVClick = () => {
    let table = [];
    table.push(table1[0]);
    for (let row of table1[1]) table.push(row);
    console.log(table);
    setTableData(table);
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
            hidden={!runClicked}
            style={{
              textDecoration: "none",
              width: 90,
              height: 35,
              background: "#F66B0E",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginRight: 20,
            }}
            data={table1}
            onClick={handleCSVClick}
            filename={"table-data"}
          >
            <FaDownload style={{ marginRight: 5 }} size={18} color="white" />
            CSV
          </CSVLink>
        </ButtonsContainer>
        <Dropdown style={{ marginLeft: 600, position: "absolute" }}>
          <Dropdown.Toggle
            variant="success"
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
            <Dropdown.Item>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
            <CodeDiv>
              {data.map((data, index) => (
                <div key={index} id="div" style={{ position: "relative" }}>
                  <InputDiv
                    className="input"
                    contentEditable={true}
                    onKeyDown={(event) => handleKeyPress(index, event)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    onInput={(event) => updateSuggesstions(event, index)}
                    spellCheck={false}
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

            <Output query={query} />
          </div>
        </div>
      </CodeAreaContainer>
    </EditorContainer>
  );
}
