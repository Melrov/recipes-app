import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { display } from "@mui/system";
import { UserContext } from "../../context/UserContext";
import SearchBar from "./SearchBar";

let activeStyle = {
  textDecoration: "underline",
};
let nonActiveStyle = {
  textDecoration: "none",
};
let activeClassName = "underline";

const List = styled.ul`
  display: flex;
  list-style-type: none;
  textdecoration: none;
`;
const ListItem = styled.li`
  margin: 5px;
`;
const Con = styled.div`
  background-color: #d6a99a;
  margin: 0px;
  padding: 0px;
`;

export default function NavBar() {
  const { user, logout } = React.useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Con>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <List>
          <ListItem>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
            >
              Home
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to="/search"
              style={({ isActive }) =>
                isActive ? activeStyle : nonActiveStyle
              }
            >
              Search
            </NavLink>
          </ListItem>
        </List>
        {/* <Box sx={{ p: 3 }} /> */}
        <SearchBar />
        { user && <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip> }
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Con>
  );
}
