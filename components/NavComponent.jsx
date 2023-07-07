import { Box, NavLink } from "@mantine/core";
import {
  IconHome2,
} from "@tabler/icons-react";

export default function Navigation() {
  return (
    <Box w={180}>
      <NavLink style={{width:"75%" }} component="a" href="/"
        label="Home"
        icon={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink style={{width:"75%"}} component="a" href="/categories"
        label="Categories"
      />
      <NavLink style={{width:"75%"}} component="a" href="/layers"
        label="Layers"
      />
    </Box>
  );
}
