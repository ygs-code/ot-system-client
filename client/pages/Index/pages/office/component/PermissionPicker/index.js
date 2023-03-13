import "./index.less";

import {
  getPermissionList,
  getRolePermissionList
} from "client/assets/js/request";
import TreePicker from "client/component/TreePicker";
import { findTreeData } from "client/utils";
import React, { useEffect } from "react";

const Picker = (props) => {
  const { searchProps = {}, readOnly } = props;
  const transformTreeData = (data, treeData = []) => {
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
    return transformTreeData(data, treeData);
  };

  return (
    <TreePicker
      {...props}
      searchProps={{
        placeholder: "搜索权限名称/ID",
        ...searchProps
      }}
      buttonText={readOnly ? "查看" : "请选择"}
      isSelectLast={false}
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
        data = transformTreeData(data.data.list);
        return data;
      }}
    />
  );
};

export default (props) => {
  const { roleId, onChange } = props;

  useEffect(() => {
    roleId &&
      getRolePermissionList({
        roleId,
        pageNum: 1,
        pageSize: 10000
      }).then((data) => {
        const { data: { list = [] } = {} } = data;
        onChange({
          checkedKeys: list.map((item) => {
            return item.permissionId;
          })
        });
      });
  }, [roleId]);

  return <Picker {...props} />;
};
