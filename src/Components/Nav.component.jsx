import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
  AppBar, Toolbar,
  IconButton,
  Menu,
  MenuItem

} from "@mui/material";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLogoutMutation } from "../store/services/endpoints/auth.endpoint";
import MenuIcon from '@mui/icons-material/Menu';

import { AllContext } from "../context/AllContext";

const NavComponent = () => {
  const location = useLocation();
  const { setLogout } = useContext(AllContext);
  const { cart } = useContext(AllContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const nav = useNavigate();

  const open = Boolean(anchorEl);
  const handleClose  = () => {
    setAnchorEl(null);
  };


  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [logoutFun] = useLogoutMutation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogout(true);
    nav("/client/login");
  };

  return (
    <>




      {/* Header/Navbar */}
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "white", borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar className="container mx-auto w-full flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center font-semibold tracking-wide text-gray-800">
            <p onClick={() => nav('/home')} className="text-lg">
              <span className="text-blue-600">X</span>PERFUMES
            </p>
          </div>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
            <a href="/home" className={`hover:text-blue-600 transition duration-300 ${location.pathname == "/home" ? "text-blue-600" : " "}`}>Home</a>
            <a href="/products" className={`hover:text-blue-600 transition duration-300 ${location.pathname.includes('stock') || location.pathname.includes('product') ? "text-blue-600" : " "
              }`}>Products</a>
            <a href="#" className="hover:text-blue-600 transition duration-300">Categories</a>
            <a href="#" className="hover:text-blue-600 transition duration-300">Contact</a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <IconButton className="text-gray-600 hover:text-blue-600 transition duration-300">
              <SearchIcon />
            </IconButton>
            <IconButton className="text-gray-600 hover:text-blue-600 transition duration-300">
              <Badge onClick={() => nav('/stock/cart')} badgeContent={cart?.length} sx={{ '& .MuiBadge-badge': { backgroundColor: '#3B82F6', textAlign: "center", fontWeight: "bold", color: "white" } }}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              id="profile-button"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleProfileClick}
              className="text-gray-700  transition-all duration-300 p-2 rounded-full focus:outline-none "
            >
              <AccountCircle className="text-3xl hover:text-blue-500 duration-1000 transition-all " />
            </IconButton>

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "profile-button",
              }}

              className="mt-2"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {/* Order Item */}
              <MenuItem
                component={Link}
                to="/order"
                onClick={handleClose}
                className="flex items-center space-x-3 py-2 px-4 hover:bg-blue-50 transition duration-200"
              >
                <ShoppingBagOutlinedIcon className="text-blue-500" />
                <span className="text-gray-800 font-medium">Orders</span>
              </MenuItem>

              {/* Profile Item */}
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleClose}
                className="flex items-center space-x-3 py-2 px-4 hover:bg-blue-50 transition duration-200"
              >
                <PersonOutlineOutlinedIcon className=" text-emerald-500 " />
                <span className="text-gray-800 font-medium">Profile</span>
              </MenuItem>

              {/* Logout Item */}
              <MenuItem
                onClick={handleLogout}
                className="flex items-center space-x-3 py-2 px-4 hover:bg-red-50 transition duration-200"
              >
                <ExitToAppOutlinedIcon className="text-gray-500" />
                <span className="text-gray-800 font-medium">Logout</span>
              </MenuItem>
            </Menu>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden">
              <IconButton>
                <MenuIcon />
              </IconButton>
            </div>
          </div>

        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavComponent;
