import { getUserList, getUserRoleList } from "client/assets/js/request";
import Actions from "client/component/Actions";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
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
          label: "文档标题",
          name: "title",
          type: "input",
          span: 1
        }
      ],
      [
        {
          label: "文档标题",
          name: "title",
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

    return [
      [
        {
          title: "文档标题",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "创建人",
          dataIndex: "createBy",
          key: "createBy"
        },

        {
          title: "操作",
          dataIndex: "actions",
          key: "actions",
          width: 120,
          render: () => {
            return <Actions />;
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
              label: "全部文档",
              value: "0"
            },
            {
              label: "我的文档",
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
