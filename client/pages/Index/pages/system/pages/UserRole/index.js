import { Input } from "antd";
import { getUserList, getUserRoleList } from "client/assets/js/request";
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
      label: "用户&角色"
    }
  ],
  title: "用户&角色"
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
          label: "用户名称",
          name: "name",
          type: "input",
          span: 1
        },
        {
          label: "用户ID",
          name: "id",
          type: "input"
        },
        {
          label: "用户Email",
          name: "email",
          type: "input",

          render: (props) => {
            return <Input {...props}></Input>;
          }
        },
        {
          label: "用户手机",
          name: "phone",
          type: "input",
          render: (props) => {
            return <Input {...props}></Input>;
          }
          // rules: [
          //   {
          //     required: true,
          //     message: "Please input your username3",
          //   },
          // ],
        },
        {
          label: "用户类型",
          name: "type",
          type: "select",
          props: {
            options: [
              {
                label: "全部类型",
                value: ""
              },
              {
                label: "管理员",
                value: "1"
              },
              {
                label: "会员",
                value: "2"
              }
            ]
          },
          itemProps: {}
        }
      ],
      [
        {
          label: "用户&角色ID",
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
          label: "用户ID",
          name: "userId",
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
    const { tabsValue } = this.state;
    const { pushRoute, routePaths: { userRoleDetails } = {} } = this.props;

    return [
      [
        {
          title: "用户ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "用户名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "手机",
          dataIndex: "phone",
          key: "phone"
        },
        {
          title: "用户类型",
          dataIndex: "type",
          key: "type",
          render: (text) => {
            return (
              [
                {
                  label: "管理员",
                  value: 1
                },
                {
                  label: "会员",
                  value: 2
                }
              ].find((item) => {
                return item.value === text;
              }) || {}
            ).label;
          }
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
                    label: "新增编辑角色", // 按钮文字
                    status: true, //权限控制
                    props: {
                      onClick: () => {
                        pushRoute({
                          path: userRoleDetails,
                          params: {
                            action: "edit",
                            id
                          } // 地址传参
                        });
                      }
                    }
                  },
                  {
                    label: "查看拥有角色权限", // 按钮文字
                    status: true, //权限控制
                    props: {
                      onClick: () => {
                        pushRoute({
                          path: userRoleDetails,
                          params: {
                            action: "view",
                            id
                          } // 地址传参
                        });
                      }
                    }
                  }
                  // {
                  //   label: "查看拥有权限", // 按钮文字
                  //   status: true, //权限控制
                  //   props: {
                  //     onClick: () => {}
                  //   }
                  // }
                ]}
              />
            );
          }
        }
      ],

      [
        {
          title: "用户&角色ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "角色ID",
          dataIndex: "roleId",
          key: "roleId"
        },
        {
          title: "用户ID",
          dataIndex: "userId",
          key: "userId"
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
      0: getUserList,
      1: getUserRoleList
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
              label: "用户设置角色",
              value: "0"
            },
            {
              label: "用户&角色",
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
