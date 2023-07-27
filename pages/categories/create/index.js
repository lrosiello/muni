import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { creating } from "../../../services/apiCalls";
import { Modal, Button, Group, Box, Text } from "@mantine/core";

export default function CreateCategory() {
  const isFirstRender = useRef(true);
  const router = useRouter();
  const { jsonData } = router.query;
  const parsedJsonData = jsonData ? JSON.parse(decodeURIComponent(jsonData)) : null;

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCategory, setShowCategory] = useState([]);

  useEffect(() => {
    const creatingCategory = async () => {
      try {
        const response = await creating(
          `${process.env.NEXT_PUBLIC_URL}/api/categories`,
          parsedJsonData, "categories"
        );
  
        if (response.error) {
          setErrorMessage(response.error);
        } else {
          setSuccessMessage("Element Created Successfully");
          const newCategory = [response.category];
          setShowCategory(newCategory);
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error creating category: ", error);
        setErrorMessage("Error creating category: " + error.message);
        setLoading(false);
      }
    };
    if (isFirstRender.current) {
      isFirstRender.current = false;
      creatingCategory();
    }
  }, [parsedJsonData]);

  

  const handleClose = () => {
    router.push("/categories");
  };

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
        hideclosebutton="true"
      >
       {loading ? (
          <div>Loading...</div>
        ) : successMessage ? (
          showCategory.map((entry, index) => (
            <Box key={index} style={{ display:"flex",flexDirection:"column",textAlign:"center", marginBottom: "10px" }}>
              {Object.entries(entry).map(([key, value]) => (
                <Text key={key}>
                  {`${key}: ${JSON.stringify(value)}`}
                </Text>
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
