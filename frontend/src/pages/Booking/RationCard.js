import { Box, Button, Card, CardContent, IconButton, InputAdornment, OutlinedInput, TextField, Typography, Autocomplete  } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function RationCard({ Name, ration, isEditing, editRation, confirmChanges }) {
  const [rationProducts, setRationProducts] = useState(ration.products);
  const [newProdAdding, setNewProdAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [newProductWeight, setNewProductWeight] = useState('');
  const [availableProducts, setAvailableProducts] = useState([
    { productId: 1, Name: 'Meat', pricePer100g: 0.5 },
    { productId: 2, Name: 'Poop', pricePer100g: 1.2 },
    { productId: 3, Name: 'Fish', pricePer100g: 1.3 },
    { productId: 4, Name: 'Vegetables', pricePer100g: 0.4 }
  ]);
  const [totalPrice, setTotalPrice] = useState(ration.price);

  useEffect(() => {
    const calculatedPrice = rationProducts.reduce((total, product) => total + (product.weight * product.pricePer100g / 100), 0);
    setTotalPrice(calculatedPrice);
  }, [rationProducts]);

  const handleOnNewProdAdding = () => {
    setNewProdAdding(!newProdAdding);
  };

  const handleAddProduct = () => {
    if (newProduct && newProductWeight) {
      const newProductEntry = {
        productId: newProduct.productId,
        Name: newProduct.Name,
        weight: parseFloat(newProductWeight),
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
        product.productId === id ? { ...product, weight: parseFloat(weight) } : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setRationProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
  };

  const handleConfirmChanges = () => {
    const updatedRation = {
      ...ration,
      products: rationProducts,
      price: totalPrice
    };
    confirmChanges(updatedRation);
  };

  return (
    <Card sx={{ maxWidth: 445, mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Ration for {Name}</Typography>
          <IconButton onClick={editRation}>
            <EditIcon />
          </IconButton>
        </Box>
        {!isEditing && (
          <Box sx={{border: '1px solid black', borderRadius:'5px', padding:'30px 30px'}}>
            {ration.products.map((product) => (
              <Box key={product.productId} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 1 }}>
                <Typography sx={{ flex: '1 1 40%' }}>{product.Name}</Typography>
                <Typography sx={{ flex: '1 1 40%' }}>{product.weight} g</Typography>
              </Box>
            ))}
          </Box>
        )}
        {isEditing && (
          <Box sx={{border: '1px solid black', borderRadius:'5px', padding:'30px 30px'}}>
            {rationProducts.map((product) => (
              <Box key={product.productId} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Typography>{product.Name}</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">g</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  type='number'
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
                <AddCircleOutlineIcon sx={{paddingRight:'30px'}}/>
                Add product
              </Button>}
            {newProdAdding &&
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <Autocomplete
                  disablePortal
                  options={availableProducts}
                  getOptionLabel={(option) => option.Name}
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
        <Typography variant="h6" sx={{ marginTop: 2 }}>Price: ${totalPrice.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
}

export default RationCard;