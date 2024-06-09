import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';



function getStyles(service, selectedServices, theme) {
  return {
    fontWeight:
      selectedServices.indexOf(service) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ services, selectedServices, handleServiceChange }) {
  const theme = useTheme();
  console.log(selectedServices)
  const totalServicePrice = selectedServices.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return total + (service ? service.price : 0);
  }, 0);

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">Services</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={selectedServices}
          onChange={handleServiceChange}
          input={<OutlinedInput id="select-multiple-chip" label="Services" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={services.find(s => s.id === value)?.name || value} />
              ))}
            </Box>
          )}
        >
          {services.map((service) => (
            <MenuItem
              key={service.id}
              value={service.id}
              style={getStyles(service.id, selectedServices, theme)}
            >
              {service.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Service Price: ${totalServicePrice.toFixed(2)}
      </Typography>
    </Box>
  );
}