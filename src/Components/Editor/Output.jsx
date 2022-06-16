import React, { useEffect, useState } from "react";
import { ResultContainer } from "./outputStyles";
import { Table } from "react-bootstrap";
import { executeQuery } from "../../Tables/tables";

export default function Output({ nothing, query, onComplete }) {
  const table = executeQuery(query);

  return (
    <ResultContainer>
      {!nothing && query !== "" && table.headers.length > 0 ? (
        <Table striped bordered hover onClick={onComplete}>
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.data.map((item) => (
              <tr>
                {Object.keys(item).map((key) => (
                  <td>{item[key]}</td>
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
