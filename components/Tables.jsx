import React, { useState } from "react";
import { Box, Table } from "@mantine/core";
import { Pagination } from "@mantine/core";
import { tableSelect, getRows } from "../services/tablesLibs";

function Tables(props) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { table, tableName } = props;

  const columnHeaders = tableSelect(tableName);
  const rows = getRows(table, tableName);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRows = rows.slice(startIndex, endIndex);

  return (
    <>
    <Box>
      <Table style={{zIndex:1}}>
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
    <Pagination
        total={rows.length}
        limit={limit}
        page={page}
        onChange={setPage}
        limitOptions={[10, 30, 50]}
      /></>
  );
}

export default Tables;
