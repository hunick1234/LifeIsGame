import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { LOGOUT } from "../../API";
import useUserInfo from "../../hook/useUserInfo";

const UserPopover = ({ isLogin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo, setUserInfo } = useUserInfo();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  isLogin = false || userInfo?.isLogin;
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Avatar src="/broken-image.jpg" onClick={handlePopoverOpen} />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {isLogin ? (
              <>
                <ListItemButton component="a" href="/">
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component="a" href="/user">
                  <ListItemText primary="user" />
                </ListItemButton>
                <ListItemButton component="a" href="/settings">
                  <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton component="a" href="/logout">
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton component="a" href="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
                <ListItemButton component="a" href="/singup">
                  <ListItemText primary="Singup" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default UserPopover;
