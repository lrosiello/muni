import React, { useState } from "react";
import { Box, Table, Title } from "@mantine/core";
import { Pagination } from "@mantine/core";
import { tableSelect, getRows } from "../services/tablesLibs";
import ButtonAdd from "./ButtonAdd";

function Tables(props) {
  const { table, tableName } = props;
  const columnHeaders = tableSelect(tableName);
  const rows = getRows(table, tableName);

  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(rows.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRows = rows.slice(startIndex, endIndex);

  return (
    <>
    <Box style={{display:"flex", justifyContent:"center", textTransform:"capitalize"}}><Title>{tableName}</Title></Box>
    
    <Box style={{display:"flex", flexDirection:"row", width:"95%", justifyContent:"space-between"}}>
      <Pagination
        total={totalPages}
        limit={limit}
        page={page}
        onChange={setPage}
      />
      <ButtonAdd tableName={tableName} columns={columnHeaders}/>
      </Box>
      <Box>
        <Table style={{ zIndex: 1, overflow: "scroll" }}>
          <thead>
            <tr>
              {columnHeaders.map((thead) => (
                <th key={thead}>{thead}</th>
              ))}
            </tr>
          </thead>
          <tbody>{paginatedRows}</tbody>
        </Table>
      </Box>
    </>
  );
}

export default Tables;
