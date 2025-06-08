import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLogoutMutation } from "../store/services/endpoints/auth.endpoint";
import MenuIcon from "@mui/icons-material/Menu";
import { AllContext } from "../context/AllContext";
import { useGetCategoryQuery } from "../store/services/endpoints/category.endpoint";

const NavComponent = () => {
  const location = useLocation();
  const { setLogout } = useContext(AllContext);
  const { cart } = useContext(AllContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [snack, setSnack] = useState(false);
  const open = Boolean(anchorEl);
  const { data: categories } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });

  const nav = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [logoutFun] = useLogoutMutation();

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") return;
    setSnack(false);
  };

  const handleCategory = (id) => {
     nav(`/category/${id}`);
     setAnchorEl2(null);
  }

  const handleLogout = () => {
    if (!localStorage.getItem("token")) {
      alert("You Have Already Logged Out !");
    } else {
      localStorage.removeItem("token");
      setLogout(true);
      setSnack(true);
      setTimeout(() => {
        nav("/");
      }, 1500);
    }
  };

  return (
    <>
      {/* Header/Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}
      >
        <Toolbar className="container mx-auto w-full flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center font-semibold tracking-wide text-gray-800">
            <p onClick={() => nav("/")} className="text-lg">
              <span className="text-blue-600">X</span>PERFUMES
            </p>
          </div>

          {/*  Nav */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
            <a
              href="/"
              className={`hover:text-blue-600 transition duration-300 ${
                location.pathname == "/" ? "text-blue-600" : " "
              }`}
            >
              Home
            </a>
            <a
              href="/products"
              className={`hover:text-blue-600 transition duration-300 ${
                location.pathname.includes("stock") ||
                location.pathname.includes("product")
                  ? "text-blue-600"
                  : " "
              }`}
            >
              Products
            </a>

            <div className="realative">
              <button
                onClick={(e) => setAnchorEl2(e.currentTarget)}
                className={`hover:text-blue-600 transition duration-300 ${
                  location.pathname.includes("categories") ||
                  location.pathname.includes("category")
                    ? "text-blue-600"
                    : ""
                }`}
              >
                Categories
              </button>

              <Menu
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={() => setAnchorEl2(null)}
                className="mt-4"
                PaperProps={{
                  className: "!rounded-xl mx-auto !shadow-2xl mt-3",
                }}
              >
                <div className="p-6 min-w-screen mx-auto  ">
                  <h2 className=" ml-12 mb-5 font-bold text-base text-gray-900 text-left">
                    Categories
                  </h2>
                  <div className="text-left grid grid-cols-2 md:grid-cols-6 gap-6 place-items-center">
                    {categories?.data?.map((category) => (
                      <div
                        onClick={() => handleCategory(category?._id)}
                        key={category?._id}
                        className="flex items-center gap-3 w-[180px] rounded-lg  hover:shadow-sm  duration-200  p-2 border border-gray-200"
                      >
                        <img
                          src={category?.image || "/fallback-image.png"}
                          className="w-16 h-16 object-cover rounded-md  border  transition-transform duration-150"
                        />
                        <h3 className="font-bold text-sm text-wrap text-gray-900 mb-1 text-center">
                          {category.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </Menu>
            </div>

            <a
              href="/about"
              className={`hover:text-blue-600 transition duration-300 ${
                location.pathname == "/about" ? "text-blue-600" : " "
              }`}
            >
              About Us
            </a>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-2">
            <IconButton className="text-gray-600 hover:text-blue-600 transition duration-300">
              <SearchIcon />
            </IconButton>
            <IconButton className="text-gray-600 hover:text-blue-600 transition duration-300">
              <Badge
                onClick={() => nav("/stock/cart")}
                badgeContent={cart?.length}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#3B82F6",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  },
                }}
              >
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
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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

      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Account Logged Out Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default NavComponent;
