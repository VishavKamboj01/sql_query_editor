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
        <Header>Databases</Header>
        <Bar>
          <FaDatabase size={15} color="black" />
          <Text>Rent-and-Run</Text>
        </Bar>
      </Databases>
      <Tables>
        <Header>Tables</Header>
        <Bar>
          <BiTable size={20} color="black" />
          <Text>Customer</Text>
        </Bar>
        <Bar>
          <BiTable size={20} color="black" />
          <Text>User</Text>
        </Bar>
        <Bar>
          <BiTable size={20} color="black" />
          <Text>Rental</Text>
        </Bar>
      </Tables>
    </SideBarContainer>
  );
}
