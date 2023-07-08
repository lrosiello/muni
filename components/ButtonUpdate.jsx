import React, { useState } from "react";
import { IconButton } from "rsuite";
import CreateForm from "./CreateForm";
import UpdateRoundIcon from "@rsuite/icons/UpdateRound";

const ButtonUpdate = ({ row, tableName, columns }) => {
  const [showForm, setShowForm] = useState(false);

  const handleUpdate = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <IconButton
        icon={<UpdateRoundIcon />}
        style={{ color: "darkblue" }}
        onClick={handleUpdate}
      ></IconButton>
      {showForm && (
        <CreateForm
          onClose={handleCloseForm}
          row={row}
          tableName={tableName}
          columns={columns}
        />
      )}
    </>
  );
};

export default ButtonUpdate;
