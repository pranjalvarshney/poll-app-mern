import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";

export const CreatePoll = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("");

  const handleTopicInput = useCallback((e) => {
    setTopic(e.target.value);
  }, []);

  const handleOptionInput = useCallback((e) => {
    setOptionName(e.target.value);
  }, []);

  const handleOptionInputButton = useCallback(() => {
    if (optionName !== "") {
      let optionArray = [...options, { name: optionName }];
      setOptions(optionArray);
      setOptionName("");
    } else {
      alert("No value passed!");
    }
  }, [optionName, options]);

  const handleCreatePoll = useCallback(async () => {
    try {
      const payload = {
        topic: topic,
        options: options,
      };
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, options, topic]);

  return (
    <>
      <Box mt={3}>
        <Container>
          <Paper variant="outlined">
            <Grid container p={3} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3">Create Poll </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Create Topics</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="topic"
                  label="Enter poll title"
                  variant="outlined"
                  value={topic}
                  onChange={handleTopicInput}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Create Options</Typography>
              </Grid>
              {options?.map((option, index) => {
                return (
                  <Grid key={index} item xs={12}>
                    <Paper variant="outlined">
                      <Button disabled fullWidth>
                        {option.name}
                      </Button>
                    </Paper>
                  </Grid>
                );
              })}
              <Grid item xs={12} container spacing={3} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    name="topic"
                    label="Enter Option"
                    variant="outlined"
                    size="small"
                    value={optionName}
                    onChange={handleOptionInput}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    size="medium"
                    variant="outlined"
                    onClick={handleOptionInputButton}
                  >
                    Add Option
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Button
                  size="large"
                  color="info"
                  variant="contained"
                  fullWidth
                  onClick={handleCreatePoll}
                  disabled={
                    options.length === 0 || topic === "" || optionName !== ""
                  }
                >
                  Create Poll
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
