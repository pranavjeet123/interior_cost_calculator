import type { Metadata } from "next";
import "./globals.css";
import MuiProvider from "@/components/MuiProvider";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Pranav Interior Designs – Interior Cost Estimator",
  description: "Professional interior design cost estimation tool by Pranav Interior Designs, Bhubaneswar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MuiProvider>
          <Navbar />
          <Box component="main" sx={{ minHeight: "calc(100vh - 64px)", bgcolor: "background.default" }}>
            {children}
          </Box>
        </MuiProvider>
      </body>
    </html>
  );
}
