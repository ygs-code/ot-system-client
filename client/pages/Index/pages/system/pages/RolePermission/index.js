import { getRoleList, getRolePermissionList } from "client/assets/js/request";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import TableButton from "client/component/TableButton";
import { tablePage } from "client/component/TablePage";
import Tabs from "client/component/Tabs";
import { addRouterApi } from "client/router";
import React, { Component } from "react";
// 权限控制
@setBreadcrumbAndTitle({
  //设置面包屑和标题
  breadcrumb: [
    {
      label: "角色&权限"
      // href: "http://localhost:3000/index",
      // path: "xxxx",
    }
    // {
    //   label: "菜单2",
    //   // href: "http://localhost:3000/index",
    //   path: "/",
    //   component: ""
    // }
    // {
    //   label: "菜单3",
    //   // href: "http://localhost:3000/index",
    //   // path: "/",
    //   component: "",
    // },
  ],
  title: "角色&权限"
})
@addRouterApi
@tablePage
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsValue: "0"
    };
  }

  // // 获取默认搜索参数
  // getDefaultSearchParams = () => {
  //   return {
  //     status: ""
  //   };
  // };

  // 定义搜索栏字段
  getSearchFields() {
    const { tabsValue } = this.state;

    return [
      [
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
      ],

      [
        {
          label: "角色&权限ID",
          name: "id",
          type: "input"
        },

        {
          label: "角色ID",
          name: "roleId",
          type: "input",
          span: 1
        },

        {
          label: "权限ID",
          name: "permissionId",
          type: "input",
          span: 1
        }
      ]
    ][tabsValue];
  }

  // 定义Tab字段
  getTabFilterItems = () => {
    return [];
  };

  // 定义表头字段
  getColumns = () => {
    const { pushRoute, routePaths: { rolePermissionDetails } = {} } =
      this.props;
    const { tabsValue } = this.state;

    return [
      [
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
          width: 300,
          render: (text, row) => {
            const { id } = row;

            return (
              <TableButton
                render={[
                  {
                    // showPopconfirm: true, // 是否需要弹窗提示
                    // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                    label: "新增编辑权限", // 按钮文字
                    status: true, //权限控制
                    props: {
                      onClick: () => {
                        pushRoute({
                          path: rolePermissionDetails,
                          params: {
                            action: "edit",
                            id
                          } // 地址传参
                        });
                      }
                    }
                  },
                  {
                    // showPopconfirm: true, // 是否需要弹窗提示
                    // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                    label: "查看", // 按钮文字
                    status: true, //权限控制
                    props: {
                      onClick: () => {
                        pushRoute({
                          path: rolePermissionDetails,
                          params: {
                            action: "view",
                            id
                          } // 地址传参
                        });
                      }
                    }
                  }
                ]}
              />
            );
          }
        }
      ],
      [
        {
          title: "角色&权限ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "角色ID",
          dataIndex: "roleId",
          key: "roleId"
        },
        {
          title: "权限ID",
          dataIndex: "permissionId",
          key: "permissionId"
        },

        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime"
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
          key: "updateTime"
        }
      ]
    ][tabsValue];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async (searchParams = {}) => {
    const { tabsValue } = this.state;
    const mapRequest = {
      0: getRoleList,
      1: getRolePermissionList
    };

    const { data } = await mapRequest[tabsValue](searchParams);

    return data;
  };

  getTableProps = () => {
    return {};
  };
  componentDidMount() {}
  render() {
    const { tabsValue } = this.state;

    return (
      <div className="table-page">
        <Tabs
          onChange={(value) => {
            this.setState(
              {
                tabsValue: value
              },

              () => {
                this.onResetForm();
                this.loadTableData();
              }
            );
          }}
          value={tabsValue}
          items={[
            {
              label: "角色设置权限",
              value: "0"
            },
            {
              label: "角色&权限",
              value: "1"
            }
          ]}></Tabs>

        {this.renderSearch({
          shrinkLength: 5,
          initialValues: {
            type: ""
          }
        })}
        {this.renderTable({
          rowKey: "id"
        })}
      </div>
    );
  }
}
export default Index;
