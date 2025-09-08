import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, CircularProgress, Typography, Alert } from "@mui/material";
import { Log } from "../lib/logger";

function findByCode(code) {
  return code === "abc123"
    ? {
        longUrl: "https://example.com",
        expiresAt: new Date(Date.now() + 60000).toISOString(),
      }
    : null;
}

export default function RedirectPage() {
  const { code } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      try {
        const entry = findByCode(code);
        if (!entry) {
          await Log("frontend", "error", "redirect", "unknown shortcode");
          setStatus("error");
          return;
        }

        const now = Date.now();
        if (new Date(entry.expiresAt).getTime() < now) {
          await Log("frontend", "warn", "redirect", "link expired");
          setStatus("expired");
          return;
        }

        await Log("frontend", "info", "redirect", "click recorded");
        window.location.href = entry.longUrl;
      } catch {}
    })();
  }, [code]);

  if (status === "loading") {
    return (
      <Stack alignItems="center" spacing={2}>
        <CircularProgress />
        <Typography>Redirecting…</Typography>
      </Stack>
    );
  }
  if (status === "error")
    return <Alert severity="error">Unknown shortcode.</Alert>;
  if (status === "expired")
    return <Alert severity="warning">Link expired.</Alert>;
  return null;
}
