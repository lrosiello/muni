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

export default function UpdateForm({ tableName, data, id }) {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchCategories();
    setFormData(data);
  }, [data]);

  const fetchCategories = async () => {
    const categories = await getCategories();
    categories.sort((a, b) => a.category_name.localeCompare(b.category_name));
    setCategories(categories);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleInputChange = (value, column) => {
    setFormData((prevData) => ({
      ...prevData,
      [column]: value,
    }));
  };

  const handleSubmit = () => {
    let jsonData = {};
    if (tableName === "categories") {
      jsonData = {
        categoryName: formData.category_name || "",
        description: formData.description || "",
        available: formData.available || false,
      };
    } else if (tableName === "layers") {
      jsonData = {
        layerName: formData.layer_name || "",
        description: formData.description || "",
        category: formData.category || "",
        available: formData.available || false,
      };
    }
    const hrefUpdate = `/${tableName}/${id}/update/?action=put&jsonData=${encodeURIComponent(
      JSON.stringify(jsonData)
    )}`;
    router.push(hrefUpdate);
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
        <Text>Updating element for {tableName}</Text>
        <Divider style={{ margin: "10px" }} />

        {Object.entries(data).map(([column, value]) => {
          if (column === "id" || column === "order_number") {
            return null;
          }

          if (column === "available") {
            return (
              <Box key={column} style={{ marginBottom: "10px" }}>
                <Text>{column}</Text>
                <Select
  data={["true", "false"]}
  placeholder="Select value"
  value={formData[column] ? formData[column].toString() : "false"}
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
                  value={formData[column] || ""}
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
                value={formData[column] || ""}
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
          <Button onClick={handleSubmit} variant="gradient" gradient={{ from: "blue", to: "green" }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </> 
  );
}
