import { message } from "antd";
import React, { memo, useEffect } from "react";
import ReconnectingWebSocket from "reconnectingwebsocket";
import ShareDB from "client/modules/otServe/lib/client";
import Quill from "./quill";
import Cursors from "./cursors";
import { stabilization } from "client/utils";

import { type } from "rich-text";
ShareDB.types.register(type);

var Quill = require("./quill");
class Main {
  constructor({ quillElId, quillOptions = {} }) {
    // const { id, type } = getUrlParams(window.location.href);
    // this.documentId = id;
    // this.documentType = type;
    this.options = {};
    this.documentConnectionState = null;

    this.quill = new Quill(
      {
        elId: quillElId,
        onTextChange: (delta, oldDelta, source) => {
          this.textChange(delta, oldDelta, source);
        },
        onSelectionChange: (range, oldRange, source) => {
          this.selectionChange(range, oldRange, source);
        }
      },
      quillOptions
    );

    this.setLocalCursorsData = {};
    this.isSetLocalCursorsFlag = 0;
  }
  // 获取回调地址参数
  getUrlParams(url) {
    // 通过 ? 分割获取后面的参数字符串
    let urlStr = url.split("?")[1] || "";

    // 创建空对象存储参数
    let obj = {};
    // 再通过 & 将每一个参数单独分割出来
    let paramsArr = urlStr.split("&");
    for (let i = 0, len = paramsArr.length; i < len; i++) {
      // 再通过 = 将每一个参数分割为 key:value 的形式
      let arr = paramsArr[i].split("=");
      obj[arr[0]] = arr[1];
    }
    return obj;
  }
  // 初始化参数
  init({
    documentId,
    documentType,
    documentTitle,
    onCursorConnectionState = () => {},
    onDocumentConnectionState = () => {},
    onChangeCursors = () => {},
    onChangeDocument = () => {},
    cursorConnectionUrl,
    documentConnectionUrl,
    userName, // 用户名称
    userId
  }) {
    this.options = {
      documentId,
      documentType,
      userName, // 用户名称
      userId, // 用户id
      onCursorConnectionState,
      onDocumentConnectionState,
      onChangeCursors,
      onChangeDocument,
      cursorConnectionUrl,
      documentConnectionUrl,
      documentTitle
    };

    this.initCursors();

    this.initDocument();
  }
  // 初始化光标
  initCursors() {
    const { userName } = this.options;
    this.cursors = new Cursors(userName);
  }
  // 初始化文档
  initDocument() {
    this.createShareDBConnection();
    this.createDocument();
    this.docSubscribe();
  }
  // 设置本地光标
  setQuillCursors({ localCursor, cursorList, removeCursorList }) {
    const { onChangeCursors } = this.options;

    // 设置光标
    for (let item of cursorList) {
      if (item.id == localCursor.id) {
        this.quill.removeCursor(item.id);
      } else if (item.range) {
        this.quill.setCursor(item.id, item.range, item.name, item.color);
      } else {
        this.quill.removeCursor(item.id);
      }
    }

    // 删除光标
    for (let item of removeCursorList) {
      this.quill.removeCursor(item.id);
    }
    onChangeCursors({ localCursor, cursorList, removeCursorList });
  }

  createShareDBConnection() {
    const {
      userName, // 用户名称
      userId // 用户id
    } = this.options;
    const { documentId, documentType, documentConnectionUrl } = this.options;
    this.shareDBSocket = new ReconnectingWebSocket(documentConnectionUrl);

    //
    this.shareDBConnection = new ShareDB.Connection(this.shareDBSocket, {
      c: documentType,
      d: documentId,

      data: {
        userName, // 用户名称
        userId, // 用户id
        cursor: {
          a: this.cursors.localCursor // 添加,
        }
      }
    });

    // 连接初始化 回调
    this.shareDBConnection.on("hs", (message) => {
      const {
        data: { cursor: { a, gp, d } = {} }
      } = message;

      let cursors = this.cursors.setLocalCursor(a, gp);

      this.setQuillCursors(cursors);
    });

    this.shareDBConnectionState();
  }

  // 状态监听
  shareDBConnectionState() {
    const { onDocumentConnectionState } = this.options;
    this.shareDBConnection.on("state", (state, reason) => {
      this.documentConnectionState = state.toString();
      onDocumentConnectionState(state.toString());
    });
  }
  createDocument() {
    const { documentId, documentType } = this.options;

    this.doc = this.shareDBConnection.get(documentType, documentId);
  }

  // 偶尔会有光标错误问题 必须要修正才行
  correctCursorData() {
    const {
      userName, // 用户名称
      userId // 用户id
    } = this.options;
    stabilization(3000).then(() => {
      var range = this.quill.getSelection();
      const { index, length } = this.cursors.localCursor.range || {};
      const { index: quillRangeIndex, length: quillRangeLength } = range || {};
      if (index !== quillRangeIndex || quillRangeLength !== length) {
        const { localCursor } = this.cursors.setLocalCursor({
          range
        });

        this.doc.submitOp(
          {
            op: {
              ops: []
            },
            data: {
              userName, // 用户名称
              userId, // 用户id
              cursor: {
                e: localCursor
              }
            }
          },
          {
            source: this.quill
          },
          (err) => {
            if (err) {
              console.error("Submit OP returned an error:", err);
            }
          }
        );
      }
    });
  }
  docSubscribe() {
    const {
      userName, // 用户名称
      userId // 用户id
    } = this.options;
    this.doc.subscribe((err) => {
      if (err) {
        throw err;
      }
      if (!this.doc.type) {
        // this.doc.create(
        //   {
        //     op: {
        //       ops: [
        //         {
        //           insert: "",
        //         },
        //       ],
        //     },
        //     data: {
        //       userName: "yao guan shou",
        //       userId: "123",
        //     },
        //   },
        //   "rich-text",
        //   {
        //     data: {
        //       userName, // 用户名称
        //       userId, // 用户id
        //     },
        //   }
        // );
      }

      // update editor contents  更新文本内容
      this.quill.setContents(this.doc.data);
      this.quill.registerTextChangeListener();
      this.doc.on("op", (message, source) => {
        const {
          data: { cursor: { a, d, e } = {} },
          op
        } = message;
        console.log("message==", message);
        // debugger
        if (source !== this.quill) {
          // 更新文本
          this.quill.updateContents(op);
          if (a) {
            this.cursors.addCursorList(a);
          }
          if (e) {
            this.cursors.setCursorList(e);
          }
          if (d) {
            this.cursors.removeCursorList(d);
          }

          this.setQuillCursors({
            localCursor: this.cursors.localCursor,
            cursorList: this.cursors.cursorList,
            removeCursorList: d || []
          });
        }
      });

      // // 没有输入的时候设置光标
      // this.doc.on("nothing pending", () => {
      //   // this.correctCursorData();
      //   // // 获取光标
      //   // var range = this.quill.getSelection();
      // });
    });
  }

  textChange(delta, oldDelta, source) {
    const {
      userName, // 用户名称
      userId // 用户id
    } = this.options;
    // // local -> server
    // this.quill.on("text-change", (delta, oldDelta, source) => {
    if (source == "user") {
      let localCursorRangeIndex = this.cursors.localCursor.range
        ? this.cursors.localCursor.range.index +
          this.cursors.localCursor.range.length
        : 0;

      let changeRangeIndex = 0;
      for (let item of delta.ops) {
        const { insert = "" } = item;

        changeRangeIndex += insert.length - (item.delete || 0);
      }

      if (this.documentConnectionState === "connected") {
        const cursors = this.cursors.setLocalCursor({
          range: {
            index: localCursorRangeIndex + changeRangeIndex,
            length: 0
          }
        });
        const { localCursor } = cursors;
        this.setQuillCursors(cursors);

        this.doc.submitOp(
          {
            op: delta,
            data: {
              userName, // 用户名称
              userId, // 用户id
              cursor: {
                e: localCursor
              }
            }
          },
          {
            source: this.quill
          },
          (err) => {
            if (err) {
              console.error("Submit OP returned an error:", err);
            }
          }
        );
        // 矫正光标问题
        this.correctCursorData();
      }

      this.options.onChangeDocument &&
        this.options.onChangeDocument({
          delta: this.quill.getDelta(),
          deltas: this.doc.data,
          text: this.quill.getText(),
          html: this.quill.getHtml()
        });
    }
    // });
  }

  selectionChange(range, oldRange, source) {
    const {
      userName, // 用户名称
      userId // 用户id
    } = this.options;
    const cursors = this.cursors.setLocalCursor({
      range
    });
    const { localCursor } = cursors;

    this.setQuillCursors(cursors);

    // 发送ot
    this.doc.submitOp(
      {
        op: {
          ops: []
        },
        data: {
          userName, // 用户名称
          userId, // 用户id
          cursor: {
            e: localCursor
          }
        }
      },
      {
        source: this.quill
      },
      (err) => {
        if (err) {
          console.error("Submit OP returned an error:", err);
        }
      }
    );
  }
}

var usernameInputEl = document.getElementById("username-input");
var usersListEl = document.getElementById("users-list");
var sharedbSocketStateEl = document.getElementById("sharedb-socket-state");
var sharedbSocketIndicatorEl = document.getElementById(
  "sharedb-socket-indicator"
);
var socketStateEl = document.getElementById("cursors-socket-state");
var socketIndicatorEl = document.getElementById("cursors-socket-indicator");

usernameInputEl.value = chance.name();
usernameInputEl.focus();
usernameInputEl.select();

function updateUserList(connections, localCursor) {
  // Wipe the slate clean
  usersListEl.innerHTML = null;

  connections = connections.reduce((acc, item, index) => {
    if (item.id == localCursor.id) {
      acc.unshift(item);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  connections.forEach(function (connection) {
    var userItemEl = document.createElement("li");
    var userNameEl = document.createElement("div");
    var userDataEl = document.createElement("div");

    userNameEl.innerHTML =
      "<strong>" +
      (connection.name || "(Waiting for username...)") +
      "</strong>";
    userNameEl.classList.add("user-name");

    if (connection.id == localCursor.id) {
      userNameEl.innerHTML += " (You)";
    }

    if (connection.range) {
      userDataEl.innerHTML = [
        '<div class="user-data">',
        " <div>Index: " +
          (connection.range ? connection.range.index : "") +
          "</div>",
        "  <div>Length: " +
          (connection.range ? connection.range.length : 0) +
          "</div>",
        "</div>"
      ].join("");
    } else {
      userDataEl.innerHTML = "(光标不在编辑器中)";
    }

    userItemEl.appendChild(userNameEl);
    userItemEl.appendChild(userDataEl);

    userItemEl.style.backgroundColor = connection.color;
    usersListEl.appendChild(userItemEl);
  });
}

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
document.getElementById("connect-btn").addEventListener("click", (event) => {
  const { id = "1", type: type = "documents" } = main.getUrlParams(
    window.location.href
  );

  main.init({
    documentTitle: "ot协同文档",
    documentId: id, // 文档id
    documentType: type, // 文档类型
    userName: usernameInputEl.value, // 用户名称
    userId: 123,
    // 文档连接状态
    onDocumentConnectionState: (state) => {
      var indicatorColor;
      sharedbSocketStateEl.innerHTML = state;
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
      sharedbSocketIndicatorEl.style.backgroundColor = indicatorColor;
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
      const { cursorList, localCursor } = data;
      updateUserList(cursorList, localCursor);
    },
    // 改变文档内容
    onChangeDocument: (data) => {
      console.log("onChangeDocument", data);
    },
    // 文档websocket 连接
    documentConnectionUrl:
      (location.protocol === "https:" ? "wss" : "ws") +
      "://" +
      window.location.host +
      "/sharedb" +
      `?documentId=${1}&documentType=${type}&userName=${
        usernameInputEl.value
      }&userId=123&documentTitle=ot协同文档`
    // // 光标websocket 连接
    // cursorConnectionUrl:
    //   (location.protocol === "https:" ? "wss" : "ws") +
    //   "://" +
    //   window.location.host +
    //   "/cursors" +
    //   `?documentId=${id}&documentType=${type}`,
  });

  main.quill.enable();

  document.getElementById("connect-panel").style.display = "none";
  document.getElementById("users-panel").style.display = "block";
  event.preventDefault();
  return false;
});
