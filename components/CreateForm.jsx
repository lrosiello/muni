import {
  Text,
  Paper,
  Divider,
  Box,
  Button,
  Select,
  Input,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCategories } from "../services/apiCalls";

export default function CreateForm({ tableName, columns, onClose }) {
  const router = useRouter();

  const [categories, setCategories] = useState([]);

  //it brings categories if the table to create is layer
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await getCategories();
    categories.sort((a, b) => a.order_number - b.order_number);
    setCategories(categories);
  };

  console.log(categories);
  const handleCancel = () => {
    onClose();
  };
  ///////////////////////////////////////////////////////////

  const [formData, setFormData] = useState({});

  const handleInputChange = (value, column) => {
    setFormData((prevData) => ({
      ...prevData,
      [column]: value,
    }));
  };
  const handleSubmit = () => {
    // Crear el objeto JSON correspondiente según la tabla
    let jsonData = {};
    if (tableName === "categories") {
      jsonData = {
        categoryName: formData.category_name || "",
        description: formData.description || "",
        available: formData.available || false,
      };
    } else if (tableName === "layers") {
      jsonData = {
        layerName: formData.layerName || "",
        description: formData.description || "",
        category: formData.category || "",
        available: formData.available || false,
      };
    }
    const hrefCreate = `/${tableName}/create/?action=post&jsonData=${encodeURIComponent(JSON.stringify(jsonData))}`;
    router.push(hrefCreate);

  };



  return (
    <>
      <Paper
        shadow="sm"
        radius="md"
        p="md"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          marginLeft: "10%",
          marginRight: "20%",
          position: "absolute",
        }}
      >
        <Text>Creating element for {tableName}</Text>
        <Divider style={{ margin: "10px" }} />

        {columns.map((column) => {
          if (column === "id" || column === "order_number") {
            return null; // Ignorar campos "id" y "order_number"
          }

          if (column === "available") {
            return (
              <Box key={column} style={{ marginBottom: "10px" }}>
                <Text>{column}</Text>
                <Select
                  data={["true", "false"]}
                  placeholder="Select value"
                  onChange={(value) => handleInputChange(value, column)}
                />
              </Box>
            );
          }

          if (column === "category") {
            return (
              <Box key={column} style={{ marginBottom: "10px" }}>
                <Text>{column}</Text>
                <Select
                  data={categories.map((category) => category.category_name)}
                  placeholder="Select category"
                  onChange={(value) => handleInputChange(value, column)}
                />
              </Box>
            );
          }

          return (
            <Box key={column} style={{ marginBottom: "10px" }}>
              <Text>{column}</Text>
              <Input
                placeholder={`Enter ${column}`}
                onChange={(e) => handleInputChange(e.target.value, column)}
              />
            </Box>
          );
        })}

        <Divider style={{ margin: "10px" }} />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button onClick={handleCancel} variant="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  );
}
