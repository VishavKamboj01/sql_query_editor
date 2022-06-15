import React from "react";
import { ResultContainer } from "./outputStyles";
import { Table } from "react-bootstrap";

export default function Output({ headers, data }) {
  return (
    <ResultContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              {Object.keys(item).map((key) => (
                <td>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </ResultContainer>
  );
}
