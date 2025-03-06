import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const toggleSearch = () => {
    // setSearchOpen((prev) => !prev);
    navigate("/search");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <StorefrontOutlinedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 , fontSize:"3rem"}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 8,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SHOPPY
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
              <MenuItem onClick={() => handleNavigate("/products")}>
                Products
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/about")}>
                About Us
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/contact")}>
                Contact Us
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <StorefrontOutlinedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SHOPPY
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => handleNavigate("/")}
              sx={{
                color: "white",
                "&:hover": {
                  color: "tomato",
                },
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => handleNavigate("/products")}
              sx={{
                color: "white",
                "&:hover": {
                  color: "tomato",
                },
              }}
            >
              Products
            </Button>
            <Button
              onClick={() => handleNavigate("/about")}
              sx={{
                color: "white",
                "&:hover": {
                  color: "tomato",
                },
              }}
            >
              About Us
            </Button>
            <Button
              onClick={() => handleNavigate("/contact")}
              sx={{
                color: "white",
                "&:hover": {
                  color: "tomato",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>

          {/* Search Bar - Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onClick={toggleSearch}
              />
            </Search>
          </Box>

          {/* Search Icon - Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleSearch} color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "56px",
                left: 0,
                right: 0,
                backgroundColor: "white",
                p: 1,
                zIndex: 1200,
              }}
            >
              <Search sx={{ width: "100%" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onClick={toggleSearch}
                />
              </Search>
            </Box>
          )}

          <ShoppingCartOutlinedIcon sx={{ml:1}} onClick={()=>navigate("/cart")}/>
          <AccountCircleIcon sx={{ml:1}} onClick={()=>navigate("/login")}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
