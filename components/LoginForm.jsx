import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core';

export function LoginForm({ onLogin }) {
  const handleSignIn = () => {
    onLogin();
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Log in
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />

        <Button onClick={handleSignIn} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}