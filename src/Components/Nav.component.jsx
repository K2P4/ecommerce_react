// Refactored NavComponent with clean structure and responsive mobile navigation
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  ExitToAppOutlined,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Home,
  Info,
  ContactPage,
} from "@mui/icons-material";
import { useLogoutMutation } from "../store/services/endpoints/auth.endpoint";
import { AllContext } from "../context/AllContext";
import { useGetCategoryQuery } from "../store/services/endpoints/category.endpoint";

const NavComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLogout, cart } = useContext(AllContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snack, setSnack] = useState(false);

  const { data: categories } = useGetCategoryQuery({ search: "", perpage: 15 });
  const [logoutFun] = useLogoutMutation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogout(true);
    setSnack(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
    setCategoryAnchor(null);
    setMobileOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path || location.pathname.includes(path);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}
      >
        <Toolbar className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div
            className="text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            X<span className="text-blue-600">PERFUMES</span>
          </div>

          <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-600">
            <Link
              to="/"
              className={
                isActive("/") ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Home
            </Link>
            <Link
              to="/products"
              className={
                isActive("products") ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Products
            </Link>
            <button
              onClick={(e) => setCategoryAnchor(e.currentTarget)}
              className={
                isActive("category") ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Categories
            </button>
            <Menu
              anchorEl={categoryAnchor}
              open={Boolean(categoryAnchor)}
              className="mt-7"
              onClose={() => setCategoryAnchor(null)}
            >
              <div className="p-4  w-screen mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories?.data?.map((cat) => (
                  <MenuItem
                    key={cat._id}
                    onClick={() => handleCategoryClick(cat._id)}
                  >
                    <img
                      src={cat.image || "/fallback-image.png"}
                      alt={cat.name}
                      className="w-14 shadow-lg object-cover h-14 rounded mr-3"
                    />
                    <span className="font-semibold ">{cat.name}</span>
                  </MenuItem>
                ))}
              </div>
            </Menu>
            <Link
              to="/about"
              className={
                isActive("about") ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className={
                isActive("contact") ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <IconButton onClick={() => navigate("/products/cart")}>
              <Badge badgeContent={cart?.length} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <AccountCircle className="text-3xl" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem component={Link} to="/order">
                {" "}
                <ShoppingBagOutlined /> Orders{" "}
              </MenuItem>
              {/* <MenuItem component={Link} to="/profile">
                {" "}
                <PersonOutlineOutlined /> Profile{" "}
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                {" "}
                <ExitToAppOutlined /> Logout{" "}
              </MenuItem>
            </Menu>
            <div className="sm:hidden">
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/products"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>
                <ShoppingBagOutlined />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListSubheader>Categories</ListSubheader>
          {categories?.data?.map((cat) => (
            <ListItem key={cat._id} disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(cat._id)}>
                <ListItemIcon>
                  <img
                    src={cat?.image}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </ListItemIcon>
                <ListItemText primary={cat.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/about"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/contact-us"
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>
                <ContactPage />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack(false)}
          severity="success"
          variant="filled"
        >
          Account Logged Out Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default NavComponent;
