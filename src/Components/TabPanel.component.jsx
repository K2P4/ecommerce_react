import React from 'react'
import { Box } from "@mui/material";


const TabPanelComponent = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
};


export default TabPanelComponent