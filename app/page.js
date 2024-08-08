"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import SuggestionAI from "./SuggestionAI";
import CloseButton from "./CloseButton";
import { generateRecepes } from "./action";

const Home = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pantry, setPantryItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const displayAISuggestions = async () => {
    try {
      setLoading(true);
      const pantryString = pantry.map((item) => item.name).join(", ");
      const recipes = await generateRecepes(pantryString);
      setRecipes(recipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAI = () => {
    setOpenAI(true);
    displayAISuggestions();
  };

  const handleCloseAI = () => {
    setOpenAI(false);
    setRecipes([]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setItemName("");
    setQuantity(1);
    setOpen(false);
  };

  const updatePantry = async () => {
    try {
      const itemsCollection = collection(firestore, "pantry");
      const snapshot = query(itemsCollection);
      const docs = await getDocs(snapshot);
      const pantryList = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPantryItems(pantryList);
    } catch (error) {
      console.error("Error fetching pantry items: ", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      updatePantry();
    }
  }, []);

  const removeItem = async (item) => {
    try {
      const docRef = doc(firestore, "pantry", item.id);
      await deleteDoc(docRef);
      updatePantry();
    } catch (error) {
      console.error("Error removing pantry item: ", error);
    }
  };

  const addItem = async () => {
    if (!itemName.trim()) {
      alert("Item name cannot be empty");
      return;
    }

    try {
      const docRef = doc(collection(firestore, "pantry"), itemName);
      await setDoc(docRef, { name: itemName, quantity });
      updatePantry();
      handleClose();
    } catch (error) {
      console.error("Error adding pantry item: ", error);
    }
  };

  const updateQuantity = async (item, newQuantity) => {
    try {
      const docRef = doc(firestore, "pantry", item.id);
      if (newQuantity === 0) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { ...item, quantity: newQuantity });
      }
      updatePantry();
    } catch (error) {
      console.error("Error updating pantry item: ", error);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="#f7f7f7"
      padding="16px"
    >
      <Box
        width="100%"
        maxWidth="800px"
        bgcolor="#fff"
        borderRadius="12px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        padding="16px"
      >
        <Box display={"flex"} gap={"4px"}>
          <SuggestionAI
            handleOpenAI={handleOpenAI}
            openAI={openAI}
            handleCloseAI={handleCloseAI}
            isLoading={isLoading}
            recipes={recipes}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ marginBottom: "16px" }}
          >
            Add Item
          </Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
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
              width={400}
              bgcolor="background.paper"
              border="2px solid #000"
              boxShadow={24}
              p={4}
              borderRadius="8px"
              textAlign="center"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="black"
              >
                Add New Pantry Item
              </Typography>
              <TextField
                id="item-name"
                label="Item Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                id="item-quantity"
                label="Quantity"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={addItem}
                sx={{ marginTop: "16px" }}
              >
                Add Item
              </Button>
              <CloseButton handleClose={handleClose} />
            </Box>
          </Box>
        </Modal>
        <Box
          width="100%"
          height="120px"
          bgcolor="#FFD1DC"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="8px 8px 0 0"
          marginBottom="16px"
        >
          <Typography
            variant="h3"
            color="black"
            fontWeight="bold"
            textAlign="center"
          >
            º∙👩🏻‍🍳₊˚Pantry Items˚🍪 ˚ෆ
          </Typography>
        </Box>
        <Stack
          width="100%"
          height="400px"
          spacing={2}
          overflow="auto"
          padding="16px"
        >
          {pantry.map((item) => (
            <Box
              key={item.id}
              width="100%"
              height="80px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#ff4060"
              borderRadius="8px"
              padding="0 16px"
            >
              <Typography variant="h5" color="#fff" fontWeight="500">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)} (x
                {item.quantity})
              </Typography>
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  sx={{
                    marginRight: "8px",
                    backgroundColor: "#9E7CD7",
                    "&:hover": { backgroundColor: "#B399D3" },
                  }}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    updateQuantity(item, Math.max(item.quantity - 1, 0))
                  }
                  sx={{
                    marginRight: "8px",
                    backgroundColor: "#9E7CD7",
                    "&:hover": { backgroundColor: "#B399D3" },
                  }}
                >
                  -
                </Button>
                <Button variant="contained" onClick={() => removeItem(item)}>
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
