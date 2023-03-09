import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { memo, useCallback, useEffect, useState } from "react";
import { stabilization } from "utils";

import Dropdown from "./Dropdown";
import Header from "./Header";
import Main from "./Main";
import Sider from "./Sider";

const $stabilization = stabilization();
// let width = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(
    document.documentElement.clientWidth < 600 ? 0 : 240
  );

  const [windosWidth, setWindosWidth] = useState(
    document.documentElement.clientWidth
  );

  /*
   小于950是平板
   小于600是手机
  */
  const getWindosWidth = useCallback(async () => {
    await $stabilization(300);
    if (document.documentElement.clientWidth < 600) {
      setWidth(0);
    } else {
      setWidth(240);
    }

    setWindosWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getWindosWidth);
    return () => {
      window.removeEventListener("resize", getWindosWidth);
    };
  }, []);

  console.log("props======", props);

  const onChangeDrawerOpen = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        open={open}
        width={width}
        windosWidth={windosWidth}
        onChange={onChangeDrawerOpen}
      />
      <CssBaseline />

      <Sider
        open={open}
        width={width}
        windosWidth={windosWidth}
        onChange={(flag) => {
          onChangeDrawerOpen();
        }}>
        <DrawerHeader>
          <IconButton onClick={onChangeDrawerOpen}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center"
                  }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center"
                  }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sider>
      <Main open={open} width={width} windosWidth={windosWidth}>
        <Dropdown />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac. Consequat mauris nunc
        congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque
        volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
        tincidunt ornare massa eget egestas purus viverra accumsan in. In
        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec
        nam aliquam sem et tortor. Habitant morbi tristique senectus et.
        Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
        euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan
        lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
        sagittis orci a.
      </Main>
    </Box>
  );
});
