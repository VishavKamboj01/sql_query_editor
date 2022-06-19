import React from "react";
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
  return (
    <SideBarContainer>
      <Databases>
        <Header>SCHEMAS</Header>
        <Bar>
          <FaDatabase size={15} color="#F66B0E" />
          <Text>Rent-and-Run</Text>
        </Bar>
        <Bar>
          <FaDatabase size={15} color="#F66B0E" />
          <Text>decorate-my-background</Text>
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
