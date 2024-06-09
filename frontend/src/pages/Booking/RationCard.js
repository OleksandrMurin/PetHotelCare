import { Box, Button, Card, CardContent, IconButton, InputAdornment, OutlinedInput, TextField, Typography, Autocomplete, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

function RationCard({ Name, ration, animalInfo, setRation, availableProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [rationProducts, setRationProducts] = useState(ration.productInRation.map(product => ({
    productId: product.productId,
    weight: Math.round(product.weight), 
    name: availableProducts.find(p => p.id === product.productId)?.name || 'Unknown',
    pricePer100g: availableProducts.find(p => p.id === product.productId)?.pricePer100g || 0
  })));
  const [newProdAdding, setNewProdAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [newProductWeight, setNewProductWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState(ration.price);
  const fetchRation = async (petId, weight, activity) => {
    try {
      const response = await axios.post(`https://localhost:7108/api/Booking/CreateRation?petId=${petId}&weight=${weight}&activity=${activity}`, { withCredentials: true });
      setRation(response.data);
    } catch (error) {
      console.error('Error fetching ration:', error);
    }
  };
  useEffect(() => {
    fetchRation( animalInfo.petId, animalInfo.weight * 100, animalInfo.activity)
  }, []);
  
  useEffect(() => {
    const calculatedPrice = rationProducts.reduce((total, product) => total + (product.weight * product.pricePer100g / 100), 0);
    setTotalPrice(calculatedPrice);
  }, [rationProducts]);

  const handleOnNewProdAdding = () => {
    setNewProdAdding(!newProdAdding);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAddProduct = () => {
    if (newProduct && newProductWeight) {
      const newProductEntry = {
        productId: newProduct.id,
        name: newProduct.name,
        weight: Math.round(parseFloat(newProductWeight)), // Округление веса до целого значения
        pricePer100g: newProduct.pricePer100g
      };
      setRationProducts(prevProducts => [...prevProducts, newProductEntry]);
      setNewProduct(null);
      setNewProductWeight('');
      setNewProdAdding(false);
    }
  };

  const handleChangeWeight = (id, weight) => {
    setRationProducts(prevProducts =>
      prevProducts.map(product =>
        product.productId === id ? { ...product, weight: Math.round(parseFloat(weight)) } : product // Округление веса до целого значения
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setRationProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
  };

  const handleConfirmChanges = () => {
    setRation(prevRation => ({
      ...prevRation,
      productInRation: rationProducts.map(product => ({
      rationId: prevRation.id,
      productId: product.productId,
      weight: product.weight
    })),
    price: totalPrice}));
    setIsEditing(false);
  };

  return (
    <Card sx={{ maxWidth: 445, mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
          <Typography variant="h5" sx={{ display: 'flex', justifySelf: 'center', alignSelf: 'center' }}>Ration for {Name}</Typography>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Box>
        {!isEditing && (
          <Box sx={{ border: '1px solid black', borderRadius: '5px', padding: '30px 30px' }}>
            {rationProducts.map((product) => (
              <Box>
                <Box key={product.productId} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 1 }}>
                <Typography sx={{ flex: '1 1 40%' }}>{product.name}</Typography>
                <Typography sx={{ flex: '1 1 40%' }}>{product.weight} g</Typography>
                </Box>
                <Divider/>
              </Box>
            ))}
          </Box>
        )}
        {isEditing && (
          <Box sx={{ border: '1px solid black', borderRadius: '5px', padding: '30px 30px' }}>
            {rationProducts.map((product) => (
              <Box key={product.productId} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Typography>{product.name}</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">g</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  type="number"
                  value={product.weight}
                  onChange={(e) => handleChangeWeight(product.productId, e.target.value)}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
                <IconButton onClick={() => handleDeleteProduct(product.productId)} sx={{ width: '20px', height: '20px' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {!newProdAdding &&
              <Button onClick={handleOnNewProdAdding} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <AddCircleOutlineIcon sx={{ paddingRight: '30px' }} />
                Add product
              </Button>}
            {newProdAdding &&
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Autocomplete
                  disablePortal
                  options={availableProducts}
                  getOptionLabel={(option) => option.name}
                  value={newProduct}
                  onChange={(event, newValue) => setNewProduct(newValue)}
                  renderInput={(params) => <TextField {...params} label="Select product" />}
                  sx={{ flex: '1 1 60%' }}
                />
                <OutlinedInput
                  value={newProductWeight}
                  onChange={(e) => setNewProductWeight(e.target.value)}
                  placeholder="Weight"
                  endAdornment={<InputAdornment position="end">g</InputAdornment>}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  sx={{ flex: '1 1 30%', marginLeft: 2 }}
                />
                <IconButton onClick={handleAddProduct} sx={{ marginLeft: 2 }}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>}
          </Box>
        )}
        {isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleConfirmChanges}>Confirm changes</Button>
          </Box>
        )}
        <Typography variant="h6" sx={{ marginTop: 2 }}>Price per day: ${totalPrice.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
}

export default RationCard;
