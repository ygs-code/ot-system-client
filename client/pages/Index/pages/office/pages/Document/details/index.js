import "./index.less";

import { Skeleton } from "antd";
import {
  checkLogin,
  getDocumentInfo,
  getUserInfo
} from "client/assets/js/request";
import Header from "client/component/Header";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import React, { Component, useCallback, useEffect, useRef } from "react";

import Main from "./main";

const {
  env: { ENTRY_SERVER_NAME, SERVER_PORT, NODE_ENV = "development" } = {}
} = process;

const Quill = (props) => {
  const {
    match: {
      params: { id, type = "document" }
    },
    state: {
      user: {
        userInfo: { user: { id: userId, name: userName } = {} } = {}
      } = {}
    } = {},
    dispatch: { breadcrumb: { setBreadcrumb } = {} } = {}
  } = props;

  const mainRef = useRef();

  const init = useCallback(async () => {
    let {
      data: { content = "", title }
    } = await getDocumentInfo({ id });

    //设置面包屑和标题
    setBreadcrumb([
      {
        label: title
      }
    ]);

    var toolbarOptions = [
      // ['bold', 'italic'],
      // ['link', 'image'],
      [{ align: [] }],
      ["link", "image", "bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      // [{ header: 1 }, { header: 2 }], // custom button values
      // [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      // [{ direction: 'rtl' }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],

      ["clean"] // remove formatting button
    ];

    if (mainRef.current) {
      return false;
    }
    // 实例化 富文本
    mainRef.current = new Main({
      quillElId: "#editor",
      quillOptions: {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
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

    mainRef.current.quill.setContents([{ insert: content }]);

    if (!userId) {
      return false;
    }
    mainRef.current.init({
      documentTitle: title,
      documentId: id, // 文档id
      documentType: type, // 文档类型
      userName, // 用户名称
      userId,
      // 文档连接状态
      onDocumentConnectionState: () => {
        // var indicatorColor;
        // // sharedbSocketStateEl.innerHTML = state;
        // switch (state.toString()) {
        //   case "connecting":
        //     indicatorColor = "silver";
        //     break;
        //   case "connected":
        //     indicatorColor = "lime";
        //     break;
        //   case "disconnected":
        //   case "closed":
        //   case "stopped":
        //     indicatorColor = "red";
        //     break;
        // }
        // sharedbSocketIndicatorEl.style.backgroundColor = indicatorColor;
      },
      // 光标连接状态
      onCursorConnectionState: () => {
        // var indicatorColor;
        // // socketStateEl.innerHTML = state;
        // switch (state.toString()) {
        //   case "connected":
        //     indicatorColor = "lime";
        //     break;
        //   case "error":
        //   case "closed":
        //     indicatorColor = "red";
        //     break;
        // }
        // socketIndicatorEl.style.backgroundColor = indicatorColor;
      },
      // 改变光标位置
      onChangeCursors: () => {
        // const { cursorList, localCursor } = data;
        // updateUserList(cursorList, localCursor);
      },
      // 改变文档内容
      onChangeDocument: () => {},
      // 文档websocket 连接

      documentConnectionUrl: `${
        location.protocol === "https:" ? "wss" : "ws"
      }://${ENTRY_SERVER_NAME}${
        NODE_ENV === "development" ? `:${SERVER_PORT}` : ""
      }/socket/document?documentId=${id}&documentType=${type}&userName=${userName}&userId=${userId}&documentTitle=${title}`
      // // 光标websocket 连接
      // cursorConnectionUrl:
      //   (location.protocol === "https:" ? "wss" : "ws") +
      //   "://" +
      //   window.location.host +
      //   "/cursors" +
      //   `?documentId=${id}&documentType=${type}`,
    });

    // 修改是否可以编辑
    // if (userId) {
    mainRef.current.quill.enable();
    // }
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="account-management-details">
      <div
        id="editor"
        onClick={() => {
          // mainRef.current.quill.enable();
        }}></div>
    </div>
  );
};

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      authOpen: false,
      permissionValue: {},
      loading: true
    };
  }
  getUser = async () => {
    const {
      state: { user: { userInfo: { user: { id } = {} } = {} } = {} } = {},
      dispatch: {
        user: { setUserInfo }
      }
    } = this.props;

    if (id) {
      return false;
    }

    let { data: { flag } = {} } = await checkLogin();
    if (!flag) {
      return false;
    }

    let { data } = await getUserInfo({});
    setUserInfo(data);
  };
  init = async () => {
    await this.getUser();
    this.setState({
      loading: false
    });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    const { loading } = this.state;

    return (
      <div className="form-page document-details">
        <Header // avatar="头像地址"
          showOutlined={false}
          nickname={""}
          areaCode={""}
          mobile={""}
          collapsed={false}
          onClick={() => {}}
          onChangeCollapsed={() => {
            // toggle();
          }}
          breadcrumb={[]}></Header>
        {loading ? (
          <Skeleton active={loading}></Skeleton>
        ) : (
          <Quill {...this.props}></Quill>
        )}
      </div>
    );
  }
}

export default mapRedux()(
  // 权限控制
  setBreadcrumbAndTitle({
    //设置面包屑和标题
    // breadcrumb: [
    //   {
    //     label: "用户&角色",
    //     path: routePaths.userRole
    //   },
    //   {
    //     label: "详情"
    //   }
    // ],
    title: "用户&角色/详情"
  })(addRouterApi(Index))
);
