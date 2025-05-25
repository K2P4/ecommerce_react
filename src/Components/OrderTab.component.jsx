import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import OrderCurrentPage from "../pages/Shop/OrderCurrent.page";
import { OrderShopHistoryPage } from "../pages";

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const OrderTabComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        aria-label="Order Tabs"
      >
        <Tab sx={{fontFamily :"Poppins"}} label="Current Order" wrapped />
        <Tab   sx={{fontFamily :"Poppins"}} label="Order History" wrapped />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OrderCurrentPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderShopHistoryPage />
      </TabPanel>
    </Box>
  );
};

export default OrderTabComponent;
