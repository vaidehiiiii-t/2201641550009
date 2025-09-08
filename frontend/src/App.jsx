import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import ShortenPage from "./routes/ShortenPage";
import StatsPage from "./routes/StatsPage";
import RedirectPage from "./routes/RedirectPage";

export default function App() {
  const location = useLocation();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          {location.pathname !== "/" && (
            <Button color="inherit" component={Link} to="/">
              Shorten
            </Button>
          )}
          {location.pathname !== "/stats" && (
            <Button color="inherit" component={Link} to="/stats">
              Stats
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3, mb: 6 }}>
        <Routes>
          <Route path="/" element={<ShortenPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path=":code" element={<RedirectPage />} />
        </Routes>
      </Container>
    </>
  );
}
