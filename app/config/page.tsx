"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Chip,
  Stack,
  Alert,
  Snackbar,
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { loadCostData, saveCostData, DEFAULT_COST_DATA, CostItem } from "@/lib/costData";

export default function ConfigPage() {
  const [items, setItems] = useState<CostItem[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    setItems(loadCostData());
  }, []);

  const handleCostChange = (id: number, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cost: parseFloat(value) || 0 } : item
      )
    );
  };

  const handleSave = () => {
    try {
      saveCostData(items);
      setSnackbar({ open: true, message: "Rates saved successfully!", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to save. Please try again.", severity: "error" });
    }
  };

  const handleReset = () => {
    const defaults = DEFAULT_COST_DATA.map((d) => ({ ...d }));
    setItems(defaults);
    saveCostData(defaults);
    setSnackbar({ open: true, message: "Rates reset to defaults.", severity: "success" });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
          Configure Rates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update the labour cost rates. Changes are saved locally and used in all estimations.
        </Typography>
      </Stack>

      <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "primary.main",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "white" }}>
            Pranav Interior Designs · Labour Rate Card
          </Typography>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Reset to default rates from rate card">
              <Button
                size="small"
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": { borderColor: "white" },
                }}
              >
                Reset Defaults
              </Button>
            </Tooltip>
            <Button
              size="small"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                bgcolor: "#ffcc80",
                color: "#1a237e",
                fontWeight: 700,
                "&:hover": { bgcolor: "#ffb74d" },
              }}
            >
              Save Rates
            </Button>
          </Stack>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: 700, width: 50 }}>Sl.</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Work Description</TableCell>
                <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 200 }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", justifyContent: "flex-end" }}
                    spacing={0.5}
                  >
                    <span>Labour Cost (₹)</span>
                    <Tooltip title="Edit the cost value and click Save Rates">
                      <InfoOutlinedIcon fontSize="inherit" sx={{ color: "text.secondary" }} />
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, idx) => (
                <TableRow
                  key={item.id}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "white" : "grey.50",
                    "&:hover": { bgcolor: "primary.50" },
                    transition: "background 0.15s",
                  }}
                >
                  <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={item.unit === "per_sqft" ? "Per sq.ft" : "Per Piece"}
                      size="small"
                      color={item.unit === "per_sqft" ? "primary" : "secondary"}
                      variant="outlined"
                      sx={{ fontSize: "0.72rem" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={item.cost}
                      onChange={(e) => handleCostChange(item.id, e.target.value)}
                      size="small"
                      slotProps={{
                        htmlInput: { min: 0, step: 10 },
                        input: {
                          startAdornment: (
                            <Typography variant="body2" sx={{ mr: 0.5, color: "text.secondary" }}>
                              ₹
                            </Typography>
                          ),
                        },
                      }}
                      sx={{ width: 130 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "grey.50",
            borderTop: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Alert severity="info" variant="outlined">
            These rates reflect labour costs only as per the Pranav Interior Designs rate card. Material
            costs are billed separately.
          </Alert>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
