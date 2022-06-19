import React, { useEffect, useState } from "react";
import { ResultContainer } from "./outputStyles";
import { Table } from "react-bootstrap";
import { executeQuery } from "../../Tables/tables";
import { CSVDownload, CSVLink } from "react-csv";

export default function Output({ nothing, query, onComplete }) {
  const table = executeQuery(query);

  const prepareData = () => {
    let rows = [];
    rows.push(table.headers);

    for (let obj of table.data) {
      let row = [];
      row.push(obj.id);
      row.push(obj.firstName);
      row.push(obj.lastName);
      row.push(obj.username);
      rows.push(row);
    }

    return rows;
  };

  return (
    <ResultContainer>
      <CSVLink data={prepareData()}>Download</CSVLink>

      {!nothing && query !== "" && table.headers.length > 0 ? (
        <Table striped bordered hover onClick={onComplete}>
          <thead>
            <tr style={{ background: "#1a132f", color: "white", opacity: 0.6 }}>
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
