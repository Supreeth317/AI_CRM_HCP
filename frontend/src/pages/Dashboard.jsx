import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import InteractionForm from "../components/InteractionForm";
import AIChatPanel from "../components/AIChatPanel";

function Dashboard() {
  const [aiData, setAiData] = useState(null);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "24px",
          color: "#000",
          textAlign: "left",
        }}
      >
        Log HCP Interaction
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "24px",
          width: "100%",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            width: "72%",
            minHeight: "900px",
            borderRadius: "8px",
            padding: "32px",
            boxSizing: "border-box",
          }}
        >
          <InteractionForm aiData={aiData} />
        </Paper>

        <Paper
          elevation={1}
          sx={{
            width: "28%",
            minHeight: "900px",
            borderRadius: "8px",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <AIChatPanel setAiData={setAiData} />
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;