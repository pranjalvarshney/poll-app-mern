import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

export const Home = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState(null);

  const fetchAllPolls = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.status === 200) {
        setPolls(res.polls);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPolls();
  }, [fetchAllPolls]);

  return (
    <>
      <Box mt={3}>
        <Container>
          <Paper variant="outlined">
            <Grid container p={3} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3">All Polls</Typography>
              </Grid>
              {polls?.length > 0 ? (
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>Sno</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Poll Topic</b>
                          </TableCell>
                          <TableCell align="left">
                            <b>Date/Time</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {polls?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              cursor: "pointer",
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            onClick={() => navigate(`/poll/${row._id}`)}
                          >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell component="th" scope="row">
                              <b>{row.topic}</b>
                            </TableCell>
                            <TableCell align="left">
                              {new Date(row.createdAt)
                                .toUTCString()
                                .slice(0, -7)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Typography textAlign="center">
                      No polls in the database right now!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="large"
                      fullWidth
                      onClick={() => navigate("/create")}
                    >
                      Create a new poll
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
