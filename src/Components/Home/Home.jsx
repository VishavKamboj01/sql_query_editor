import React from "react";
import { BaseContainer, TopBarContainer } from "./homeStyles";
import Editor from "../Editor/Editor";
export default function Home() {
  return (
    <BaseContainer>
      <TopBarContainer>SQL EDITOR</TopBarContainer>
      <Editor />
    </BaseContainer>
  );
}
