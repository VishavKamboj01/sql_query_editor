import React, { useState } from "react";
import {
  BaseContainer,
  Button,
  ButtonsContainer,
  TopBarContainer,
} from "./homeStyles";
import Editor from "../Editor/Editor";
export default function Home() {
  return (
    <BaseContainer>
      <Editor />
    </BaseContainer>
  );
}
