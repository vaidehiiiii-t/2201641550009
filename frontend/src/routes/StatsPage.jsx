import React, { useEffect } from "react";
import { Card, CardContent, Typography, Alert } from "@mui/material";
import { Log } from "../lib/logger";

export default function StatsPage() {
  useEffect(() => {
    (async () => {
      try {
        await Log("frontend", "debug", "component", "entered /stats");
      } catch {}
    })();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Short Links
        </Typography>
        <Alert severity="info">Stats table coming next.</Alert>
      </CardContent>
    </Card>
  );
}
