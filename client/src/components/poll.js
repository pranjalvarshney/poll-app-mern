import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

export const PollPage = () => {
  const [poll, setPoll] = useState(null);

  const [pollResponse, setPollResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const { id } = useParams();

  const fetchPollById = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/poll/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.status === 200) {
        setPoll(res);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchPollById();
  }, [fetchPollById]);

  const markPollById = useCallback(async (optionId) => {
    const payload = {
      optionId,
    };
    try {
      const response = await fetch(`${BASE_URL}/mark`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.status === 200) {
        setSelectedOption(optionId);
        setPollResponse(res);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Box mt={3}>
        <Container>
          <Paper variant="outlined">
            <Grid container p={3} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption">
                  {" "}
                  Poll - {poll?.poll?._id}{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">Participate in Poll </Typography>
              </Grid>

              <Grid mt={3} item xs={12}>
                <TextField
                  fullWidth
                  name="topic"
                  label="Poll Topic"
                  variant="outlined"
                  inputProps={{
                    style: {
                      color: "#000",
                    },
                  }}
                  value={poll?.poll?.topic ?? ""}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="space-between">
                <Typography variant="subtitle1">
                  {poll?.options?.length} Options
                </Typography>
                <Typography variant="subtitle1">
                  {pollResponse ? pollResponse?.totalVotes : poll?.totalVotes}{" "}
                  Votes
                </Typography>
              </Grid>
              {pollResponse === null
                ? poll?.options?.map((option, index) => {
                    return (
                      <Grid key={index} item xs={12}>
                        <Paper variant="outlined">
                          <Button
                            fullWidth
                            onClick={() => markPollById(option._id)}
                          >
                            {option.name}
                          </Button>
                        </Paper>
                      </Grid>
                    );
                  })
                : pollResponse?.options?.map((option, index) => {
                    return (
                      <Grid key={index} item xs={12}>
                        <Button
                          fullWidth
                          disableTouchRipple
                          disableFocusRipple
                          disableElevation
                          variant="contained"
                          sx={{
                            background:
                              selectedOption === option._id
                                ? "#83dbff"
                                : "#d1d1d1",
                          }}
                        >
                          {option.name} {" - "} {option.percent} %
                        </Button>
                      </Grid>
                    );
                  })}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
