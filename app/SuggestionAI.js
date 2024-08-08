"use client";
import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Loading } from "./Loading";

const SuggestionAI = ({
  handleOpenAI,
  openAI,
  handleCloseAI,
  isLoading,
  recipes,
}) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAI}
        sx={{
          marginBottom: "16px",
        }}
      >
        Ask our Magic AI
      </Button>

      <Modal
        open={openAI}
        onClose={handleCloseAI}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Box
            width={800}
            maxHeight="80vh"
            bgcolor="background.paper"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            borderRadius="8px"
            overflow="auto"
          >
            {isLoading ? (
              <Loading />
            ) : (
              <Box>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  color="primary"
                  textAlign="center"
                >
                  Here are the recipes we found 🎉
                </Typography>
                {recipes.map((recipe, index) => (
                  <Box key={index} marginTop="16px" color="black">
                    <Typography variant="h5" component="h3" color="secondary">
                      {recipe.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {recipe.description}
                    </Typography>
                    <Typography variant="h5" color="textSecondary">
                      Ingredients:
                    </Typography>
                    <List>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={ingredient} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="h5" color="textSecondary">
                      Instructions:
                    </Typography>
                    <List>
                      {recipe.instructions.map((instruction, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={instruction} />
                        </ListItem>
                      ))}
                    </List>
                    {index < recipes.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCloseAI}
              sx={{
                marginTop: "16px",
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SuggestionAI;
