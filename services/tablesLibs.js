import TrashIcon from "@rsuite/icons/Trash";
import UpdateRoundIcon from "@rsuite/icons/UpdateRound";
import { IconButton } from "rsuite";
import { useRouter } from "next/router";


export function tableSelect(tableName) {
  let columnHeaders;
  if (tableName === "categories") {
    columnHeaders = [
      "id",
      "category_name",
      "description",
      "order_number",
      "available",
    ];
  } else if (tableName === "layers") {
    columnHeaders = [
      "id",
      "layer_name",
      "description",
      "order_number",
      "category",
      "available",
    ];
  }
  return columnHeaders;
}

export function getRows(elements, tableName) {
  const router = useRouter();

  const handleDelete = (id) => {
    const hrefDelete = `/${tableName}/${id}?action=delete`;
    router.push(hrefDelete);
  };

  const handleUpdate = (id) => {
    const hrefUpdate = `/${tableName}/${id}?action=put`;
    router.push(hrefUpdate);
  };

  return elements.map((element) => {
    return (
      <tr key={element.id} >
        {Object.entries(element).map(([fieldName, fieldValue], index) =>
          fieldName !== "available" ? (
            <td key={index}>{fieldValue} </td>
          ) : (
            <td key={index}>{fieldValue ? "Yes" : "No"}</td>
          )
        )}
        <td>
          <IconButton onClick={() => handleDelete(element.id)} icon={<TrashIcon />}  style={{color: "red",}}/>
          <IconButton onClick={() => handleUpdate(element.id)} icon={<UpdateRoundIcon />} style={{color: "darkblue",}}/>
        </td>
      </tr>
    );
  });
}
