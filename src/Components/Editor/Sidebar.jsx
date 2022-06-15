import React from "react";
import {
  Bar,
  Databases,
  Header,
  SideBarContainer,
  Tables,
} from "./sidebarStyles";

export default function Sidebar() {
  return (
    <SideBarContainer>
      <Databases>
        <Header>Databases</Header>
        <Bar>vidly</Bar>
      </Databases>
      <Tables>
        <Header>Tables</Header>
        <Bar>Customers</Bar>
        <Bar>Users</Bar>
        <Bar>Rentals</Bar>
      </Tables>
    </SideBarContainer>
  );
}
