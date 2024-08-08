"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Lottie from "react-lottie";
import animationData from ".//lotties/cookingLoading.json";

export function Loading({}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        color="primary"
        textAlign="center"
      >
        Just one second...
      </Typography>
      <Lottie options={defaultOptions} height={400} width={400} />
    </Box>
  );
}
