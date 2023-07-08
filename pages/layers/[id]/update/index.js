import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updating } from "../../../../services/apiCalls";
import { Modal, Button, Group, Box, Text } from "@mantine/core";

export default function UpdateLayer() {
  var ranonce = false;
  const router = useRouter();
  const { jsonData } = router.query;
  const parsedJsonData = JSON.parse(decodeURIComponent(jsonData));
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLayer, setShowLayer] = useState([]);

  useEffect(() => {
    if (!ranonce) {
      updatingLayer();
      ranonce = true;
    }
  }, []);

  const updatingLayer = async () => {
    try {
      const response = await updating(
        `${process.env.NEXT_PUBLIC_URL}/api/layers/${id}`,
        parsedJsonData,
        "layers"
      );

      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setSuccessMessage("Element Updated Successfully");
        const updatedLayer = [response.layer];
        setShowLayer(updatedLayer);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating layer: ", error);
      setErrorMessage("Error updating layer: " + error.message);
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/layers");
  };

  return (
    <>
      <Modal
        opened={successMessage || errorMessage}
        title={
          successMessage
            ? "Element Updated Successfully"
            : "Error Updating Element"
        }
        onClose={handleClose}
        size="md"
        padding="lg"
        hideCloseButton
      >
        {loading ? (
          <div>Loading...</div>
        ) : successMessage ? (
          showLayer.map((entry, index) => (
            <Box
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {Object.entries(entry).map(([key, value]) => (
                <Text key={key}>{`${key}: ${JSON.stringify(value)}`}</Text>
              ))}
            </Box>
          ))
        ) : (
          <Box>{JSON.stringify(errorMessage)}</Box>
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
