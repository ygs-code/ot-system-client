import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
import React, {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { stabilization } from "utils";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));
const openedMixin = (theme, drawerWidth) => {
  return {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
  };
};

const closedMixin = (theme) => {
  return {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  };
};
const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open, width }) => {
  return {
    width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme, width),
      "& .MuiDrawer-paper": openedMixin(theme, width)
    }),
    ...(!open && {
      ...closedMixin(theme, width),
      "& .MuiDrawer-paper": closedMixin(theme, width)
    })
  };
});
const Sider = (props) => {
  const { width, open, children, onChange = () => {} } = props;
  const [windosWidth, setWindosWidth] = useState(
    document.documentElement.clientWidth
  );
  useState;
  const theme = useTheme();

  const getWindosWidth = useCallback(async () => {
    await stabilization(300);
    setWindosWidth(document.documentElement.clientWidth);
  }, []);
  console.log("chlidern======", children);
  console.log("props======", props);
  console.log("windosWidth======", windosWidth);

  useEffect(() => {
    window.addEventListener("resize", getWindosWidth);
    return () => {
      window.removeEventListener("resize", getWindosWidth);
    };
  }, []);

  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box"
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      {Children.map(children, (child) => {
        return <>{child}</>;
      })}
    </Drawer>
  );
};

export default Sider;
