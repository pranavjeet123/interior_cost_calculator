"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1565c0 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          top: -100,
          right: -100,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          bottom: -80,
          left: -80,
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} sx={{ alignItems: "center", textAlign: "center" }}>
          <Typography
            variant="overline"
            sx={{ color: "rgba(255,255,255,0.7)", letterSpacing: 4, fontSize: "0.85rem" }}
          >
            Pranav Interior Designs · Bhubaneswar
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 800,
              lineHeight: 1.15,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Interior Design{" "}
            <Box component="span" sx={{ color: "#ffcc80" }}>
              Cost Estimator
            </Box>
          </Typography>

          <Divider sx={{ width: 80, borderColor: "#ffcc80", borderWidth: 2 }} />

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 400,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Get accurate labour cost estimates for all your interior work — from
            ceilings and partitions to kitchens, wardrobes, and more.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
            <Button
              component={Link}
              href="/estimation"
              variant="contained"
              size="large"
              startIcon={<CalculateIcon />}
              sx={{
                bgcolor: "#ffcc80",
                color: "#1a237e",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#ffb74d" },
              }}
            >
              Start Estimation
            </Button>
            <Button
              component={Link}
              href="/config"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Configure Rates
            </Button>
          </Stack>

          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.45)", mt: 2 }}
          >
            All prices are labour costs only · Rates configurable in the Config page
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
