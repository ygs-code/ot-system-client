import "./index.less";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar
  // Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountMenu from "client/component/AccountMenu";
import React, { memo } from "react";

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open, width }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

    ...(open && {
      marginLeft: width,
      width: `calc(100% - ${width}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  };
});
export default memo((props) => {
  const {
    open,
    width,
    onChange = () => {},
    windosWidth,
    user,
    onClick = () => {}
  } = props;

  return (
    <div className="header">
      <CssBaseline />
      <MuiAppBar position="fixed" open={open} width={width}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onChange}
            edge="start"
            sx={{
              marginRight: 5,
              ...(windosWidth > 600 && open && { display: "none" })
            }}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <div className="right-header">
            <div className="account-menu-box">
              <AccountMenu user={user} onClick={onClick} />
            </div>
          </div>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
});
