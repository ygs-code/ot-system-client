import { CheckDataType } from "./CheckDataType";

const recursionTreeData = (
  treeData,
  callback = () => {},
  nextLevelKey = "children"
) => {
  for (let item of treeData) {
    if (item[nextLevelKey] && item[nextLevelKey].length >= 1) {
      recursionTreeData(item[nextLevelKey], callback, nextLevelKey);
    }

    callback(item);
  }
};

// 过滤数据 可以用于搜索，包括父层的数据树形结构
const filterTreeData = (
  data = [], // 树形数组对象
  filterCallback = () => true, // 条件的回调函数
  nexKey = "children",
  _index = null
) => {
  return data.filter((item, index) => {
    if (item[nexKey] && item[nexKey].length >= 1) {
      if (
        filterCallback(
          item,
          _index === null ? `${index}` : `${_index}-${index}`
        )
      ) {
        return true;
      }
      item.children = filterTreeData(
        item[nexKey],
        filterCallback,
        nexKey,
        _index === null ? `${index}` : `${_index}-${index}`
      );
      return item[nexKey] && item[nexKey].length >= 1;
    }

    return filterCallback(
      item,
      _index === null ? `${index}` : `${_index}-${index}`
    );
  });
};

// 复杂类型数据，深拷贝
const deepCopy = (
  source, // 来源数据
  target // 新的数据 如果是数组则为 [], 如果是对象传参则为{}
) => {
  target = target || {};
  for (const i in source) {
    if (source[i] && source.hasOwnProperty(i)) {
      if (typeof source[i] === "object") {
        target[i] = source[i] && source[i].constructor === Array ? [] : {};
        deepCopy(source[i], target[i]);
      } else {
        target[i] = source[i];
      }
    }
  }
  return target;
};

// 搜索到树数据的某一条数据单条 不包括父层数据的
const findTreeData = (
  treeData, // 树形数组或者数组数据
  value, // 需要查找的value
  key, //需要查找数组对象的key
  nextKey = "children", // 下一级的key，这个不用传
  findValue = null //获取到的值，这个不用传
) => {
  for (let item of treeData) {
    if (value !== undefined && item[key] !== undefined && item[key] === value) {
      return item;
    }
    if (item && item[nextKey] && item[nextKey].length >= 1) {
      findValue = findTreeData(item[nextKey], value, key, nextKey, findValue);
    }
  }
  return findValue;
};
// 深度比较两个数据
const diffData = (oldData, newData) => {
  let flag = true;
  if (oldData !== newData) {
    return false;
  }
  if (
    (CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)) ||
    (CheckDataType.isArray(oldData) && CheckDataType.isArray(newData))
  ) {
    const oldDataKeys =
      CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)
        ? Object.keys(oldData)
        : oldData;
    const newDataKeys =
      CheckDataType.isObject(oldData) && CheckDataType.isObject(newData)
        ? Object.keys(newData)
        : newData;
    if (oldDataKeys.length !== oldDataKeys.length) {
      return false;
    }
    for (const [index, elem] of oldDataKeys.entries()) {
      if (elem !== newDataKeys[index]) {
        return false;
      }
      if (
        (CheckDataType.isObject(elem) &&
          CheckDataType.isObject(newDataKeys[index])) ||
        (CheckDataType.isArray(elem) &&
          CheckDataType.isArray(newDataKeys[index]))
      ) {
        flag = diffData(elem, newDataKeys[index]);
      }
    }
  }
  return flag;
};
// 用于 查找 树 形结构数据，形成一个路劲数组
const findTreePath = (options, path = []) => {
  const {
    treeData,
    value,
    valueKey,
    nextKey = "children",
    callback = () => {}
  } = options;

  for (var i = 0; i < treeData.length; i++) {
    var tempPath = [...path];
    tempPath.push(treeData[i]);
    if (treeData[i][valueKey] === value) {
      return tempPath;
    }
    if (treeData[i][nextKey] && treeData[i][nextKey].length) {
      const reuslt = findTreePath(
        {
          treeData: treeData[i][nextKey],
          value,
          valueKey,
          callback
        },
        tempPath
      );
      if (reuslt) {
        callback(reuslt);
        return reuslt;
      }
    }
  }
};
export {
  deepCopy,
  diffData,
  filterTreeData,
  findTreeData,
  findTreePath,
  recursionTreeData
};
