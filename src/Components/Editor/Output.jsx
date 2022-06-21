import React, { useEffect, useState } from "react";
import { ResultContainer } from "./outputStyles";
import { Table } from "react-bootstrap";
import { executeQuery } from "../../Tables/tables";

export default function Output({ query }) {
  let table = executeQuery(query);

  return (
    <ResultContainer>
      {table !== undefined ? (
        <Table striped bordered hover>
          <thead>
            <tr style={{ background: "#F66B0E", color: "white", opacity: 0.7 }}>
              {table[0].map((header) => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table[1].map((item) => (
              <tr>
                {item.map((data) => (
                  <td>{data}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ opacity: 0.4, fontStyle: "italic" }}>
            Output will show here...
          </h4>
        </div>
      )}
    </ResultContainer>
  );
}
