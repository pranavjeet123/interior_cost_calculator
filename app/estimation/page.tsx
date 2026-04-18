"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";
import CalculateIcon from "@mui/icons-material/Calculate";
import { loadCostData, CostItem } from "@/lib/costData";

interface LineItem {
  uid: string; // unique instance id
  itemId: number; // references CostItem
  label: string; // user-editable name e.g. "Master Bedroom Wardrobe"
  width: string;
  height: string;
  quantity: string;
}

function calcTotal(line: LineItem, costMap: Map<number, CostItem>): number {
  const item = costMap.get(line.itemId);
  if (!item) return 0;
  if (item.unit === "per_piece")
    return item.cost * (parseFloat(line.quantity) || 0);
  return (
    item.cost * (parseFloat(line.width) || 0) * (parseFloat(line.height) || 0)
  );
}

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

let uidCounter = 0;
const newUid = () => `uid-${++uidCounter}`;

export default function EstimationPage() {
  const [costData, setCostData] = useState<CostItem[]>([]);
  const [lines, setLines] = useState<LineItem[]>([]);

  useEffect(() => {
    setCostData(loadCostData());
  }, []);

  const costMap = new Map(costData.map((c) => [c.id, c]));

  const addLine = (item: CostItem) => {
    setLines((prev) => [
      ...prev,
      {
        uid: newUid(),
        itemId: item.id,
        label: item.name,
        width: "",
        height: "",
        quantity: "1",
      },
    ]);
  };

  const updateLine = (uid: string, patch: Partial<LineItem>) => {
    setLines((prev) =>
      prev.map((l) => (l.uid === uid ? { ...l, ...patch } : l)),
    );
  };

  const removeLine = (uid: string) => {
    setLines((prev) => prev.filter((l) => l.uid !== uid));
  };

  // count how many lines each item has
  const countPerItem = (id: number) =>
    lines.filter((l) => l.itemId === id).length;

  const grandTotal = lines.reduce((sum, l) => sum + calcTotal(l, costMap), 0);
  const hasAnyTotal = lines.some((l) => calcTotal(l, costMap) > 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} color="primary">
          Cost Estimation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Click + to add a work item — the same item can be added multiple times
          with different labels and dimensions.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* Left: Item catalogue */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={2}
            sx={{ p: 3, borderRadius: 3, position: "sticky", top: 80 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Work Items
            </Typography>
            <Stack spacing={0.5}>
              {costData.map((item) => {
                const count = countPerItem(item.id);
                return (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: count > 0 ? "primary.light" : "grey.200",
                      bgcolor: count > 0 ? "primary.50" : "white",
                      transition: "all 0.15s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "primary.50",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: count > 0 ? 600 : 400 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ₹{item.cost.toLocaleString("en-IN")} /{" "}
                        {item.unit === "per_sqft" ? "sq.ft" : "pc"}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center" }}
                      spacing={0.5}
                    >
                      {count > 0 && (
                        <Chip
                          label={count}
                          size="small"
                          color="primary"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      )}
                      <Tooltip title={`Add ${item.name}`}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => addLine(item)}
                          sx={{ p: 0.5 }}
                        >
                          <AddCircleOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        {/* Right: Line items + summary */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {lines.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: "center",
                  border: "2px dashed",
                  borderColor: "grey.300",
                  borderRadius: 3,
                }}
              >
                <CalculateIcon
                  sx={{ fontSize: 48, color: "grey.400", mb: 1 }}
                />
                <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                  Click the + button next to any item to add it
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  You can add the same item multiple times with different labels
                </Typography>
              </Paper>
            )}

            {lines.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Added Items ({lines.length})
                  </Typography>
                  <Tooltip title="Remove all items">
                    <Button
                      size="small"
                      color="error"
                      startIcon={<RestartAltIcon fontSize="small" />}
                      onClick={() => setLines([])}
                      variant="outlined"
                    >
                      Clear All
                    </Button>
                  </Tooltip>
                </Stack>

                <Stack spacing={2}>
                  {lines.map((line) => {
                    const item = costMap.get(line.itemId);
                    if (!item) return null;
                    const isPiece = item.unit === "per_piece";
                    const total = calcTotal(line, costMap);
                    const sameItemLines = lines.filter(
                      (l) => l.itemId === line.itemId,
                    );
                    const instanceIndex =
                      sameItemLines.findIndex((l) => l.uid === line.uid) + 1;

                    return (
                      <Box
                        key={line.uid}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: total > 0 ? "primary.light" : "grey.200",
                          bgcolor: "grey.50",
                          transition: "border-color 0.2s",
                        }}
                      >
                        {/* Header row */}
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1.5,
                          }}
                        >
                          <Stack spacing={0.5} sx={{ flex: 1, mr: 1 }}>
                            <Stack
                              direction="row"
                              sx={{ alignItems: "center" }}
                              spacing={1}
                            >
                              <Chip
                                label={item.name}
                                size="small"
                                color="default"
                                variant="outlined"
                                sx={{ fontSize: "0.7rem", height: 20 }}
                              />
                              {sameItemLines.length > 1 && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  #{instanceIndex}
                                </Typography>
                              )}
                            </Stack>
                            {/* Editable label */}
                            <TextField
                              value={line.label}
                              onChange={(e) =>
                                updateLine(line.uid, { label: e.target.value })
                              }
                              size="small"
                              placeholder="Label (e.g. Master Bedroom Wardrobe)"
                              variant="outlined"
                              sx={{
                                "& .MuiInputBase-input": {
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                },
                              }}
                            />
                          </Stack>
                          <Stack
                            direction="row"
                            sx={{ alignItems: "center" }}
                            spacing={1}
                          >
                            {total > 0 && (
                              <Chip
                                label={formatINR(total)}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 700 }}
                              />
                            )}
                            <IconButton
                              size="small"
                              onClick={() => removeLine(line.uid)}
                              sx={{ color: "error.main" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>

                        {/* Dimension inputs */}
                        <Stack
                          direction="row"
                          sx={{ alignItems: "center" }}
                          spacing={1}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ minWidth: 60 }}
                          >
                            ₹{item.cost.toLocaleString("en-IN")} /{" "}
                            {isPiece ? "pc" : "sq.ft"}
                          </Typography>
                          {isPiece ? (
                            <TextField
                              label="Quantity"
                              type="number"
                              size="small"
                              value={line.quantity}
                              onChange={(e) =>
                                updateLine(line.uid, {
                                  quantity: e.target.value,
                                })
                              }
                              slotProps={{ htmlInput: { min: 1 } }}
                              sx={{ width: 110 }}
                            />
                          ) : (
                            <>
                              <TextField
                                label="Width (ft)"
                                type="number"
                                size="small"
                                value={line.width}
                                onChange={(e) =>
                                  updateLine(line.uid, {
                                    width: e.target.value,
                                  })
                                }
                                slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                                sx={{ width: 115 }}
                              />
                              <Typography color="text.secondary">×</Typography>
                              <TextField
                                label="Height (ft)"
                                type="number"
                                size="small"
                                value={line.height}
                                onChange={(e) =>
                                  updateLine(line.uid, {
                                    height: e.target.value,
                                  })
                                }
                                slotProps={{ htmlInput: { min: 0, step: 0.5 } }}
                                sx={{ width: 115 }}
                              />
                              {line.width && line.height && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  noWrap
                                >
                                  ={" "}
                                  {(
                                    parseFloat(line.width) *
                                    parseFloat(line.height)
                                  ).toFixed(1)}{" "}
                                  sq.ft
                                </Typography>
                              )}
                            </>
                          )}
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </Paper>
            )}

            {/* Bill summary */}
            {hasAnyTotal && (
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Bill Summary
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PrintIcon />}
                    onClick={() => window.print()}
                  >
                    Print
                  </Button>
                </Stack>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "primary.main" }}>
                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                          Label
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                          Type
                        </TableCell>
                        <TableCell
                          sx={{ color: "white", fontWeight: 700 }}
                          align="center"
                        >
                          Dimension / Qty
                        </TableCell>
                        <TableCell
                          sx={{ color: "white", fontWeight: 700 }}
                          align="right"
                        >
                          Rate
                        </TableCell>
                        <TableCell
                          sx={{ color: "white", fontWeight: 700 }}
                          align="right"
                        >
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lines
                        .filter((l) => calcTotal(l, costMap) > 0)
                        .map((line, idx) => {
                          const item = costMap.get(line.itemId)!;
                          const isPiece = item.unit === "per_piece";
                          const dim = isPiece
                            ? `${line.quantity} pc`
                            : `${line.width} × ${line.height} sq.ft`;
                          return (
                            <TableRow
                              key={line.uid}
                              sx={{
                                bgcolor: idx % 2 === 0 ? "white" : "grey.50",
                              }}
                            >
                              <TableCell sx={{ fontWeight: 500 }}>
                                {line.label}
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {item.name}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">{dim}</TableCell>
                              <TableCell align="right">
                                ₹{item.cost.toLocaleString("en-IN")}
                              </TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600 }}>
                                {formatINR(calcTotal(line, costMap))}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Divider sx={{ my: 2 }} />
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total Labour Cost
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800 }}
                    color="primary.main"
                  >
                    {formatINR(grandTotal)}
                  </Typography>
                </Stack>
                <Alert severity="info" sx={{ mt: 2 }}>
                  This estimate covers all costs , labour cost and material cost
                  included, with finishing touch.
                </Alert>
              </Paper>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
