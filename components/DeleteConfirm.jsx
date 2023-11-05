import { Text, Paper, Divider, Box, Button } from "@mantine/core";
import { useRouter } from "next/router";

export default function DeleteConfirm(props) {
  const { data, id, action, tableName } = props;
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  const handleDelete = () => {
    deleteElement(id);
  };

  const deleteElement = () => {
    router.push(`/${tableName}/${id}/delete`);
  }

  return (
    <>
      <Paper
        shadow="sm"
        radius="md"
        p="md"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingLeft:"20%",
          paddingRight:"20%",
        }}
      >
        <Text>Are you sure to delete this element?<br/>
        {tableName === "categories" ? <Text color="red">Being a category, it would delete every layer it had</Text> : null}
        </Text>
        <Divider style={{ margin: "10px" }} />
        <Box style={{ alignSelf: "center", marginBottom: "10px" }}>
          <Text>
            {Object.entries(data).map(([fieldName, fieldValue], index) =>
              fieldName !== "available" ? (
                <p key={index}>
                  <strong>{fieldName}:</strong> {fieldValue}
                </p>
              ) : (
                <p key={index}>
                  <strong>{fieldName}:</strong>
                  {fieldValue ? "Yes" : "No"}
                </p>
              )
            )}
            <p>Action: {action}</p>
          </Text>
        </Box>
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
          <Button onClick={handleDelete} variant="gradient" gradient={{ from: "orange", to: "red" }}>
            Delete
          </Button>
        </Box>
      </Paper>
    </>
  );
}
