import "./index.less";

import { message } from "antd";
import {
  editUserRole,
  getPermissionList,
  getRoleList,
  getRolePermissionList,
  getUserInfo,
  getUserRoleList
} from "client/assets/js/request";
import FormPage from "client/component/FormPage";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import TableButton from "client/component/TableButton";
import TablePicker from "client/component/TablePicker";
import { TreeContent } from "client/component/TreePicker";
import PermissionPicker from "client/pages/Index/pages/system/component/PermissionPicker";
import { mapRedux } from "client/redux";
import { addRouterApi, routePaths } from "client/router";
import { findTreeData } from "client/utils";
import React from "react";

class Index extends FormPage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      authOpen: false,
      permissionValue: {}
    };
  }

  getRolePermissions = async (roles) => {
    const {
      form: { setFieldsValue }
    } = this;
    let permissions = [];
    let p = [];
    for (let item of roles) {
      p.push(await this.getRolePermission(item.id));
    }
    permissions = await Promise.all(p).then((data) => {
      for (let item of data) {
        for (let $item of item) {
          const { id } = $item;
          if (!permissions.includes(id)) {
            permissions.push(id);
          }
        }
      }
      return permissions;
    });

    setFieldsValue({
      permissions: {
        checkedKeys: permissions
        // checkedChildrenKeys: permissions
      }
    });
  };
  getRolePermission = async (roleId) => {
    const { data: { list = [] } = {} } = await getRolePermissionList({
      roleId,
      pageNum: 1,
      pageSize: 10000
    });

    return list;
  };

  /**
   * 用于将从接口获取到的初始化数据，转换成form需要的格式
   * 这个函数需要在getInitData中手动调用，因此函数名不限于mapInitData
   */
  mapInitData = async (initData) => {
    let { id, name, email, phone, type, roles } = initData;
    roles = roles.map((item) => {
      const { roleId: id } = item;
      return {
        id
      };
    });
    this.getRolePermissions(roles);
    return {
      id,
      name,
      email,
      phone,
      type,
      roles
    };
  };
  // 初始化值
  getInitialValues = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const { data: { user = {} } = {} } = await getUserInfo({
      id
    });

    const roles = await this.getUserRoleList();

    return await this.mapInitData({
      ...user,
      roles
    });
  };

  /**
   * 用于将form的字段值转换为接口需要的格式
   */
  mapSubmitData = (formData) => {
    const { id: userId, roles } = formData;

    return {
      userId,
      roleIds: roles.map((item) => {
        return item.id;
      })
    };
  };
  // 提交请求到接口
  onSubmitForm = async (formData) => {
    const {
      history: { back }
    } = this.props;
    const values = await this.mapSubmitData(formData);
    const { message: mgs } = await editUserRole({ ...values });
    message.success(mgs);
    setTimeout(() => {
      back();
    }, 500);
  };
  transformTreeData = (data, treeData = []) => {
    if (!data.length) {
      return treeData;
    }
    let addIds = [];
    for (let item of data) {
      const { parentId, id } = item;
      if (parentId === null) {
        addIds.push(id);
        treeData.push(item);
      } else {
        const data = findTreeData(treeData, parentId, "id", "children");
        if (data) {
          const { children = [] } = data;
          data.children = [...children, item];
          addIds.push(id);
        }
      }
    }
    data = data.filter((item) => {
      return !addIds.includes(item.id);
    });
    return this.transformTreeData(data, treeData);
  };
  getFields = () => {
    const {
      match: {
        params: { action }
      }
    } = this.props;

    const readOnly = action === "view";
    return [
      {
        type: "section",
        title: "详情基本设置",
        items: [
          {
            label: "用户ID",
            name: "id",

            render: (props) => {
              const { value } = props;

              return <div>{value}</div>;
            },
            rules: []
          },
          {
            label: "用户名称",
            name: "name",
            type: "input",
            props: {
              showCount: true,
              maxLength: 20,
              readOnly: true
            },

            rules: [
              {
                required: true,
                message: "请输入用户名称"
              }
            ]
          },
          {
            label: "邮箱地址",
            name: "email",
            type: "input",
            props: {
              showCount: true,
              maxLength: 100,
              readOnly: true
            },

            rules: [
              {
                required: true,
                message: "请输入邮箱地址"
              }
            ]
          },
          {
            label: "手机号码",
            name: "phone",
            type: "input",
            props: {
              showCount: true,
              maxLength: 11,
              readOnly: true
            },

            rules: [
              {
                required: true,
                message: "请输入手机号码"
              }
            ]
          },
          {
            label: "用户类型",
            name: "type",
            type: "select",
            props: {
              readOnly: true,
              options: [
                {
                  label: "管理员",
                  value: 1
                },
                {
                  label: "会员",
                  value: 2
                }
              ]
            },
            itemProps: {},
            options: {},

            rules: [
              {
                required: true,
                message: "请选择用户类型"
              }
            ]
          },
          {
            label: "设置角色",
            name: "roles",

            render: (props) => {
              const { value, onChange } = props;

              return (
                <TablePicker
                  readOnly={readOnly}
                  buttonText={readOnly ? "查看角色" : "选择角色"}
                  value={value}
                  onChange={(v) => {
                    onChange(v);
                    this.getRolePermissions(v);
                  }}
                  request={getRoleList}
                  modalProps={{
                    title: readOnly ? "查看角色" : "设置角色"
                  }}
                  tableProps={{
                    rowKey: "id",
                    getSearchFields: () => {
                      return [
                        {
                          label: "角色名称",
                          name: "name",
                          type: "input",
                          span: 1
                        },
                        {
                          label: "角色ID",
                          name: "id",
                          type: "input"
                        }
                      ];
                    },
                    getColumns: () => {
                      return [
                        {
                          title: "角色ID",
                          dataIndex: "id",
                          key: "id"
                        },
                        {
                          title: "角色名称",
                          dataIndex: "name",
                          key: "name"
                        },
                        {
                          title: "描述",
                          dataIndex: "description",
                          key: "description"
                        },

                        {
                          title: "操作",
                          dataIndex: "actions",
                          key: "actions",
                          width: 180,
                          render: (text, row) => {
                            const { id } = row;

                            return (
                              <TableButton
                                render={[
                                  {
                                    label: "查看角色拥有权限", // 按钮文字
                                    status: true, //权限控制
                                    props: {
                                      onClick: () => {
                                        this.setState({
                                          authOpen: true,
                                          roleId: id
                                        });
                                      }
                                    }
                                  }
                                ]}
                              />
                            );
                          }
                        }
                      ];
                    }
                  }}></TablePicker>
              );
            },
            rules: [
              // {
              //   required: true,
              //   message: "请设置角色"
              // }
            ]
          },
          {
            label: "总共拥有权限",
            name: "permissions",

            render: (props) => {
              const { value = [], onChange } = props;

              return (
                <div className="tree-picker-content user-role-details-tree-content">
                  <TreeContent
                    value={value}
                    onChange={onChange}
                    searchProps={{
                      placeholder: "搜索权限名称/ID"
                    }}
                    isSelectLast={false}
                    readOnly={true}
                    isSelectLastHasParent
                    requestParameter={{
                      pageNum: 1,
                      pageSize: 10000
                    }}
                    promiseRequest={getPermissionList}
                    searchKeys={["name", "id"]}
                    totalTitle={"一共有{n}条数据"}
                    selectedTitle={"已选{n}条数据"}
                    valueKey="id"
                    titleKey="name"
                    nextLevelKey="children"
                    dataMapper={(data) => {
                      data = this.transformTreeData(data.data.list);
                      return data;
                    }}></TreeContent>
                </div>
              );
            },
            rules: [
              // {
              //   required: true,
              //   message: "请设置角色"
              // }
            ]
          }
        ]
      }
    ];
  };

  getUserRoleList = async () => {
    const {
      match: {
        params: { id: userId }
      }
    } = this.props;
    const {
      data: { list = [] }
    } = await getUserRoleList({
      userId,
      pageNum: 1,
      pageSize: 10
    });
    return list;
  };
  componentDidMount() {}
  render() {
    const { authOpen, roleId, permissionValue } = this.state;

    return (
      <div className="form-page user-role-details">
        <PermissionPicker
          readOnly={true}
          value={permissionValue}
          roleId={roleId}
          openButton={false}
          onChange={(value) => {
            this.setState({
              permissionValue: value
            });
          }}
          modalProps={{
            title: "查看权限",
            open: authOpen,
            onCancel: async () => {
              this.setState({
                authOpen: false
              });
            },
            onOk: async () => {
              this.setState({
                authOpen: false
              });
            }
          }}></PermissionPicker>

        {this.renderForm()}
      </div>
    );
  }
}

export default mapRedux()(
  // 权限控制
  setBreadcrumbAndTitle({
    //设置面包屑和标题
    breadcrumb: [
      {
        label: "用户&角色",
        path: routePaths.userRole
      },
      {
        label: "详情"
      }
    ],
    title: "用户&角色/详情"
  })(addRouterApi(Index))
);
