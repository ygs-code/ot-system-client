import "./index.less";

import {
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
  // HomeOutlined,
  // PieChartOutlined,
  // DesktopOutlined,
  // ContainerOutlined,
  // MailOutlined,
  // AppstoreOutlined,
  // WarningOutlined,
  SettingOutlined,
  SnippetsOutlined
  // ProjectOutlined
} from "@ant-design/icons";
import {
  Menu
  //  Select
} from "antd";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

const { SubMenu } = Menu;

export default memo((props) => {
  const {
    match: { path, params: { id } = {} } = {},
    routePaths = {},
    pushRoute
  } = props;

  const [selectedKeys, setSelectedKeys] = useState("-1");
  const [openKeys, setOpenKeys] = useState([]);

  const goTo = useCallback((url) => {
    pushRoute({
      url
    });
  }, []);
  console.log("routePaths=======", routePaths.document);

  const menuData = useMemo(() => {
    return [
      // {
      //   title: "系统设置",
      //   iconComponent: <SettingOutlined />,
      //   key: "0",
      //   children: [
      //     {
      //       title: "用户权限设置",
      //       key: "0-0",
      //       children: [
      //         {
      //           title: "用户管理",
      //           url: routePaths.userManagement, // 路由地址

      //           key: "0-0-0",
      //           children: [
      //             // 子菜单
      //           ]
      //         },
      //         {
      //           title: "角色管理",
      //           url: routePaths.roleManagement, // 路由地址

      //           key: "0-0-1",
      //           children: [
      //             // 子菜单
      //           ]
      //         },

      //         {
      //           title: "权限管理",
      //           url: routePaths.permissionManagement, // 路由地址

      //           key: "0-0-2",
      //           children: [
      //             // 子菜单
      //           ]
      //         },
      //         {
      //           title: "角色&权限",
      //           url: routePaths.rolePermission, // 路由地址

      //           key: "0-0-3",
      //           children: [
      //             // 子菜单
      //           ]
      //         },
      //         {
      //           title: "用户&角色",
      //           url: routePaths.userRole, // 路由地址

      //           key: "0-0-4",
      //           children: [
      //             // 子菜单
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // },

      {
        title: "协同文档",
        iconComponent: <SnippetsOutlined />,
        key: "1",
        children: [
          {
            url: routePaths.document, // 路由地址
            title: "文档",
            key: "1-0"
          }
          // {
          //   title: "思维导图",
          //   url: "http:xxxxx", // 路由地址
          //   iconComponent: <MindMap />,
          //   key: "1-1"
          // }
        ]
      }
    ];
  }, []);

  useEffect(() => {
    const menuSelectedKeys =
      sessionStorage.getItem("adminMenuSelectedKeys") || "";
    let menuOpenKeys = sessionStorage.getItem("adminMenuOpenKeys") || "[]";
    menuOpenKeys = JSON.parse(menuOpenKeys);

    setSelectedKeys(menuSelectedKeys);
    setOpenKeys(menuOpenKeys);
  }, [id, path]);

  const getItems = useCallback((menuData, index = null) => {
    return menuData.map((item, _index) => {
      const menuKey = index === null ? _index : `${index}_${_index}`;
      const { title, iconComponent = null, children = [], url } = item;
      return {
        url,
        label: title,
        key: menuKey,
        icon: iconComponent,
        children: children.length ? getItems(children, menuKey) : null
      };
    });
  }, []);
  const getMenu = useCallback((menuData = [], index = null) => {
    return menuData.map((item, _index) => {
      const menuKey = index === null ? _index : `${index}_${_index}`;
      return item.children && item.children.length ? (
        <SubMenu key={menuKey} icon={item.iconComponent} title={item.title}>
          {getMenu(item.children, menuKey)}
        </SubMenu>
      ) : (
        <Menu.Item
          key={menuKey}
          icon={item.iconComponent}
          onClick={() => {
            goTo(item);
          }}>
          {item.title}
        </Menu.Item>
      );
    });
  }, []);

  // const onChange = useCallback((value) => {});

  // const onBlur = useCallback(() => {});

  // const onFocus = useCallback(() => {});

  // const onSearch = useCallback((val) => {});

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKeys]}
      openKeys={openKeys}
      onOpenChange={(keyPath) => {
        sessionStorage.setItem("adminMenuOpenKeys", JSON.stringify(keyPath));
        setOpenKeys(keyPath);
      }}
      onSelect={(value) => {
        const {
          key: selectedKeys,
          keyPath,
          item: { props: { url } = {} } = {}
        } = value;

        sessionStorage.setItem("adminMenuSelectedKeys", selectedKeys);
        sessionStorage.setItem("adminMenuOpenKeys", JSON.stringify(keyPath));
        setSelectedKeys(selectedKeys);
        setOpenKeys(keyPath);

        goTo(url);
      }}
      items={getItems(menuData)}
      defaultSelectedKeys={[selectedKeys]}>
      {/*
        //   isProjectPage() ? (
        //   <Menu.Item key="-1" icon={<HomeOutlined />}>
        //     <Select
        //       style={{ width: "185px" }}
        //       className="menu-select"
        //       showSearch
        //       placeholder="请选择项目"
        //       optionFilterProp="children"
        //       onChange={onChange}
        //       onFocus={onFocus}
        //       onBlur={onBlur}
        //       onSearch={onSearch}
        //       filterOption={(input, option) =>
        //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //       }
        //     >
        //       <Option value="jack">Jack</Option>
        //       <Option value="lucy">Lucy</Option>
        //       <Option value="tom">Tom</Option>
        //     </Select>
        //   </Menu.Item>
        // ) : null}
        */}
      {/*
    {getMenu(menuData)}
    */}
    </Menu>
  );
});
