import { Table } from "@mantine/core";
import { tableSelect, getRows } from "../services/tablesLibs";

function Tables(props) {
  const { table, tableName } = props;
  const elements = table;

  const columnHeaders = tableSelect(tableName);
  const rows = getRows(elements,columnHeaders, tableName);

  return (
    <Table>
      <thead>
        <tr>
          {columnHeaders.map((thead) => (
            <th key={thead}>{thead}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Tables;
