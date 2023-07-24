import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { Alert } from "@mantine/core";

export function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    try {
      // TRY TO VERIFY THE USER BY THE API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      // IF SESSION IS SUCCESSFUL
      if (response.ok && data.success) {
        onLogin();
      } else {
        // Show the error message directly from the API response
        setErrorMessage(data.message || "Error de inicio de sesión");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Log in
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {errorMessage && (
          <Alert color="red" title="Error">
            {errorMessage}
          </Alert>
        )}
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        <Button onClick={handleSignIn} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
