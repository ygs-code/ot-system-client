import "./index.less";

import { message } from "antd";
import React, { memo, useEffect } from "react";
import Layout from "client/component/Layout";
import { mapRedux } from "client/redux";

import Main from "./main";

export default mapRedux(["user"])((props) => {
  const {
    match: {
      params: { action, id, type }
    },
    state: {
      user: {
        userInfo: {
          user: { id: userId, name: userName }
        }
      }
    }
  } = props;
  console.log("props===", props);
  useEffect(() => {
    // 实例化 富文本
    const main = new Main({
      quillElId: "#editor",
      quillOptions: {
        theme: "snow",
        modules: {
          cursors: {
            autoRegisterListener: false
          },
          history: {
            userOnly: true
          }
        },
        readOnly: true
      }
    });

    main.init({
      documentTitle: "ot协同文档",
      documentId: id, // 文档id
      documentType: type, // 文档类型
      userName, // 用户名称
      userId,
      // 文档连接状态
      onDocumentConnectionState: (state) => {
        var indicatorColor;
        // sharedbSocketStateEl.innerHTML = state;
        switch (state.toString()) {
          case "connecting":
            indicatorColor = "silver";
            break;
          case "connected":
            indicatorColor = "lime";
            break;
          case "disconnected":
          case "closed":
          case "stopped":
            indicatorColor = "red";
            break;
        }
        console.log("state=========", state);
        // sharedbSocketIndicatorEl.style.backgroundColor = indicatorColor;
      },
      // 光标连接状态
      onCursorConnectionState: (state) => {
        var indicatorColor;
        socketStateEl.innerHTML = state;
        switch (state.toString()) {
          case "connected":
            indicatorColor = "lime";
            break;
          case "error":
          case "closed":
            indicatorColor = "red";
            break;
        }
        socketIndicatorEl.style.backgroundColor = indicatorColor;
      },
      // 改变光标位置
      onChangeCursors: (data) => {
        // const { cursorList, localCursor } = data;
        // updateUserList(cursorList, localCursor);
      },
      // 改变文档内容
      onChangeDocument: (data) => {
        console.log("onChangeDocument", data);
      },
      // 文档websocket 连接
      documentConnectionUrl:
        (location.protocol === "https:" ? "wss" : "ws") +
        "://" +
        "127.0.0.1:3003" +
        "/socket/document" +
        `?documentId=${id}&documentType=${type}&userName=${"用户名"}&userId=123&documentTitle=ot协同文档`
      // // 光标websocket 连接
      // cursorConnectionUrl:
      //   (location.protocol === "https:" ? "wss" : "ws") +
      //   "://" +
      //   window.location.host +
      //   "/cursors" +
      //   `?documentId=${id}&documentType=${type}`,
    });

    main.quill.enable();
  }, []);
  return (
    <div className="account-management-details">
      <Layout
        mainProps={{
          sx: {
            flexGrow: 1,
            p: 0,
            height: "100vh",
            overflow: "auto"
          }
        }}>
        <div id="editor"></div>
      </Layout>
    </div>
  );
});
