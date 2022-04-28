import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Poll APP
          </Typography>
          <Button color="inherit" onClick={() => navigate("/create")}>
            Create New
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            View All
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
