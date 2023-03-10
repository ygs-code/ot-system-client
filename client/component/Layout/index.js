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
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Header from "client/component/Header";
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useState
} from "react";
import { stabilization } from "utils";

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

const Index = (props) => {
  const { children, state: { user: { userInfo = {} } = {} } = {} } = props;
  console.log("props=========", props);
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

  const onChangeDrawerOpen = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      {/*顶部*/}
      <Header
        user={{ ...userInfo }}
        open={open}
        width={width}
        windosWidth={windosWidth}
        onChange={onChangeDrawerOpen}
        onClick={(type) => {
          console.log("type=", type);
        }}
      />
      <CssBaseline />

      {/*菜单*/}
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

      {/*中间子页面*/}
      <Main open={open} width={width} windosWidth={windosWidth}>
        {Children.map(children, (child) => {
          return cloneElement(child, props);
          // return child;
        })}
      </Main>
    </Box>
  );
};

// 装饰器
export const layout = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <Index {...this.props}>
          <Component {...this.props} />
        </Index>
      );
    }
  };
};
export default Index;
