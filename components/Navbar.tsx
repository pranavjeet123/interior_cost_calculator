"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon fontSize="small" /> },
  { label: "Estimation", href: "/estimation", icon: <CalculateIcon fontSize="small" /> },
  { label: "Config", href: "/config", icon: <SettingsIcon fontSize="small" /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Pranav Interior Designs
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  fontWeight: pathname === item.href ? 700 : 400,
                  borderBottom: pathname === item.href ? "2px solid white" : "none",
                  borderRadius: 0,
                  px: 2,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
