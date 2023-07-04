import React, { useState } from "react";
import { IconButton } from "rsuite";
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import CreateForm from "./CreateForm";

const ButtonAdd = ({tableName, columns}) => {
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <IconButton
        size="lg"
        onClick={handleCreate}
        icon={<AddOutlineIcon />}
        style={{ color: "blue" }}
      >
        Create
      </IconButton>
      {showForm && <CreateForm onClose={handleCloseForm} tableName={tableName} columns={columns} />}
    </>
  );
};

export default ButtonAdd;
