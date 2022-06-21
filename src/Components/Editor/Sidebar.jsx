import React, { useState } from "react";
import {
  Bar,
  Databases,
  Header,
  SideBarContainer,
  Tables,
  Text,
} from "./sidebarStyles";
import { FaDatabase } from "react-icons/fa";
import { BiTable } from "react-icons/bi";

export default function Sidebar() {
  const [currentSchema, setCurrentSchema] = useState("Rent-and-Run");
  const [currentTable, setCurrentTable] = useState("");

  return (
    <SideBarContainer>
      <Databases>
        <Header>SCHEMAS</Header>
        <Bar
          style={{
            width: `${currentSchema === "Rent-and-Run" ? "99%" : "85%"}`,
          }}
          onClick={() => setCurrentSchema("Rent-and-Run")}
        >
          <FaDatabase size={15} color="#F66B0E" />
          <Text>Rent-and-Run</Text>
        </Bar>
        <Bar
          style={{
            width: `${currentSchema === "Backgrounds" ? "99%" : "85%"}`,
          }}
          onClick={() => setCurrentSchema("Backgrounds")}
        >
          <FaDatabase size={15} color="#F66B0E" />
          <Text>Backgrounds</Text>
        </Bar>
      </Databases>
      <Tables>
        <Header>TABLES</Header>
        <Bar>
          <BiTable size={20} color="#34B3F1" />
          <Text>Customer</Text>
        </Bar>
        <Bar>
          <BiTable size={20} color="#34B3F1" />
          <Text>User</Text>
        </Bar>
        <Bar>
          <BiTable size={20} color="#34B3F1" />
          <Text>Rental</Text>
        </Bar>
      </Tables>
    </SideBarContainer>
  );
}
