import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { Log } from "../lib/logger";

export default function ShortenPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await Log("frontend", "debug", "component", "entered / (shorten)");
      } catch {}
    })();
  }, []);

  const handleShorten = async () => {
    setError("");
    setResult(null);

    try {
      new URL(longUrl);
    } catch {
      setError("Invalid URL");
      await Log("frontend", "error", "shorten", "malformed url");
      return;
    }

    if (shortcode === "taken") {
      setError("Shortcode already exists");
      await Log("frontend", "warn", "shorten", "shortcode collision");
      return;
    }

    // Success
    const entry = {
      code: shortcode || "abc123",
      longUrl,
      createdAt: new Date().toISOString(),
    };
    setResult(entry);
    await Log("frontend", "info", "shorten", "short link created");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Shorten a URL
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <TextField
            label="Custom shortcode (optional)"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
          <Button variant="contained" onClick={handleShorten}>
            Create
          </Button>
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {result && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Short link created:{" "}
            <a href={`/${result.code}`} target="_blank" rel="noreferrer">
              /{result.code}
            </a>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
