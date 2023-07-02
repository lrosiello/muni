"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteLayer } from "../../../../services/apiCalls";
import { Modal, Button, Group } from "@mantine/core";

export default function DeleteLayer() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await deleteLayer(id);
        setDeleteSuccess(true);
        setLoading(false);
      } catch (error) {
        setDeleteError(true);
        console.error("Error deleting layer: ", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleClose = () => {
    router.push("/layers");
  };

  const modalTitle = deleteSuccess
    ? "Element Deleted Successfully"
    : "Error Deleting Element";

  return (
    <>
      <Modal
        opened={deleteSuccess || deleteError}
        onClose={handleClose}
        title={modalTitle}
      >
        <Group position="center" style={{ marginTop: "20px" }}>
          <Button onClick={handleClose} color={deleteSuccess ? "blue" : "red"}>
            Close
          </Button>
        </Group>
      </Modal>
    </>
  );
}
