import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { creating } from "../../../services/apiCalls";
import { Modal, Button, Group } from "@mantine/core";

export default function CreateCategory() {
  const router = useRouter();
  const { jsonData } = router.query;
  const parsedJsonData = JSON.parse(decodeURIComponent(jsonData));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createCategory();
  }, []);

  const createCategory = async () => {
    try {
      const response = await creating(
        `${process.env.NEXT_PUBLIC_URL}/api/categories`,
        parsedJsonData
      );

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
      } else {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error creating category: ", error);
      setErrorMessage("Error creating category: " + error.message);
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/categories");
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <Modal
        opened={successMessage || errorMessage}
        title={
          successMessage
            ? "Element Created Successfully"
            : "Error Creating Element"
        }
        onClose={handleClose}
        size="md"
        padding="lg"
        hideCloseButton
      >
        {loading ? (
          <div>Loading...</div>
        ) : successMessage ? (
          <div>{successMessage}</div>
        ) : (
          <div>{errorMessage}</div>
        )}

        <Group position="center" style={{ marginTop: "20px" }}>
          <Button onClick={handleClose} color={successMessage ? "blue" : "red"}>
            Close
          </Button>
        </Group>
      </Modal>
    </>
  );
}
