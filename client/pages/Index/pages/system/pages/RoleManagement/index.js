import { Button, message } from "antd";
import { getRoleList, removeRole } from "client/assets/js/request";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import TableButton from "client/component/TableButton";
import { tablePage } from "client/component/TablePage";
import { addRouterApi } from "client/router";
import React, { Component } from "react";
// 权限控制
@setBreadcrumbAndTitle({
  //设置面包屑和标题
  breadcrumb: [
    {
      label: "角色管理"
    }
  ],
  title: "角色管理"
})
@addRouterApi
@tablePage
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // // 获取默认搜索参数
  // getDefaultSearchParams = () => {
  //   return {
  //     status: ""
  //   };
  // };

  // 定义搜索栏字段
  getSearchFields() {
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
  }

  // 定义Tab字段
  getTabFilterItems = () => {
    return [];
  };

  // 定义表头字段
  getColumns = () => {
    const { pushRoute, routePaths: { roleManagementDetails } = {} } =
      this.props;
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
                  // showPopconfirm: true, // 是否需要弹窗提示
                  // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                  label: "编辑", // 按钮文字
                  status: true, //权限控制
                  props: {
                    onClick: () => {
                      pushRoute({
                        path: roleManagementDetails,
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
                        path: roleManagementDetails,
                        params: {
                          action: "view",
                          id
                        } // 地址传参
                      });
                    }
                  }
                },
                {
                  showPopconfirm: true, // 是否需要弹窗提示
                  // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                  label: "删除", // 按钮文字
                  status: true, //权限控制
                  props: {
                    onClick: async () => {
                      const { message: mgs } = await removeRole(id);
                      message.success(mgs);
                      this.loadTableData();
                    }
                  }
                }
              ]}
            />
          );
        }
      }
    ];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async (searchParams = {}) => {
    const { data } = await getRoleList(searchParams);

    return data;
  };

  getTableProps = () => {
    return {};
  };
  componentDidMount() {}
  render() {
    const { pushRoute, routePaths: { roleManagementDetails } = {} } =
      this.props;
    return (
      <div className="table-page">
        <div
          style={{
            marginBottom: "20px"
          }}>
          <Button
            type="primary"
            onClick={() => {
              pushRoute({
                path: roleManagementDetails,
                params: {
                  action: "create"
                } // 地址传参
              });
            }}>
            新建角色
          </Button>
        </div>
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
