import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionIcon from "@mui/icons-material/Description";
import MailIcon from "@mui/icons-material/Mail";
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
  ListItemText,
  rgbToHex
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

export default (props) => {
  const { open } = props;

  console.log("props=====", props);

  const [active, setActive] = useState("");
  const menus = [
    {
      title: "协同文档",
      key: "document",
      url: ""
    },

    {
      title: "Inbox",
      key: "Inbox"
    },

    {
      title: "Starred",
      key: "Starred"
    },

    {
      title: "Send email",
      key: "Send email"
    },

    {
      title: "Drafts",
      key: "Drafts"
    }
  ];

  return (
    <>
      <List>
        <ListItem
          disablePadding
          sx={{ display: "block", background: "rgb(231, 247, 255)" }}>
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
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={"协同文档"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

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
    </>
  );
};
