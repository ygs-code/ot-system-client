/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 11:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { PaginationItem, TablePagination } from "@mui/material";
import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";

const Index = (props) => {
  const {
    columns,
    tableProps = {},
    paginationProps = {},
    data: {
      list = [],
      pageNum = 1,
      pageSize = 10,
      // pages,
      total
    } = {},
    // onChange = () => {},
    // onSelect = () => {}
    // rowSelection = {},
    // isShowSelect,
    // rowKey,
    onChange = () => {},
    onSelect = () => {},
    readOnly
  } = props;
  const {
    rowSelection = {},
    isShowSelect,
    rowKey
    // onChange = () => {},
    // onSelect = () => {}
  } = tableProps;

  const {
    onChange: rowSelectionOnSelect = () => {},
    onChange: rowSelectionOnSelectAll = () => {},
    selectedRowKeys: rowSelectionSelectedRowKeys = [],
    selectedRows: rowSelectionSelectedRows = []
  } = rowSelection;

  let [selectedRows, setSelectedRows] = useState([]);
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setSelectedRows(rowSelectionSelectedRows);
    setSelectedRowKeys(rowSelectionSelectedRowKeys);
  }, []);

  let $rowSelection = isShowSelect
    ? {
        selectedRowKeys,
        onSelect: (changeRow, selected, $selectedRows, nativeEvent) => {
          if (!rowKey) {
            return console.error("rowKey未设置，请设置表格rowKey");
          }
          if (selected) {
            selectedRows.push(changeRow);
            selectedRowKeys.push(changeRow[rowKey]);
          } else {
            let index = selectedRows.findIndex((item) => {
              return changeRow[rowKey] === item[rowKey];
            });

            selectedRows.splice(index, 1);
            selectedRowKeys.splice(index, 1);
          }
          setSelectedRows([...selectedRows]);
          setSelectedRowKeys([...selectedRowKeys]);
          rowSelectionOnSelect(changeRow, selected, $selectedRows, nativeEvent);
          onSelect(selectedRows, selectedRowKeys);
        },
        onSelectAll: (selected, $selectedRows, changeRows) => {
          if (!rowKey) {
            return console.error("rowKey未设置，请设置表格rowKey");
          }
          if (selected) {
            selectedRows = selectedRows.concat(changeRows);
          } else {
            selectedRows = selectedRows.filter((item) => {
              return !changeRows.some(($item) => {
                return item[rowKey] === $item[rowKey];
              });
            });
          }
          selectedRowKeys = selectedRows.map((item) => {
            return item[rowKey];
          });
          setSelectedRows([...selectedRows]);
          setSelectedRowKeys([...selectedRowKeys]);
          rowSelectionOnSelectAll(selected, $selectedRows, changeRows);
          onSelect(selectedRows, selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
          disabled: readOnly,
          // Column configuration not to be checked
          name: record.name
        })
      }
    : {};

  $rowSelection =
    Object.keys(rowSelection).length === 0 &&
    Object.keys($rowSelection).length === 0
      ? null
      : {
          ...rowSelection,
          ...$rowSelection
        };

  console.log("pageNum==", pageNum);
  console.log("pageSize==", pageSize);
  console.log("total==", total);
  return (
    <div className="table-box">
      <div className="table">
        <Table
          {...tableProps}
          columns={columns}
          dataSource={list}
          rowSelection={$rowSelection}
          pagination={false}
        />
      </div>

      <div className="pagination-box">
        <TablePagination
          component="div"
          labelRowsPerPage="每页行数"
          count={total}
          page={pageNum}
          rowsPerPage={pageSize}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}–${to} 总条数 ${
              count !== -1 ? count : `more than ${to}`
            }`;
          }}
          renderItem={(item) => <PaginationItem {...item} />}
          getItemAriaLabel={(type, page, selected) => {
            return {
              type: "page",

              page: 1,
              selected: true
            };
          }}
          onPageChange={(event, newPage) => {
            if (newPage <= 0) {
              return false;
            }
            onChange({
              pageNum: newPage,
              pageSize
            });
          }}
          onRowsPerPageChange={({ target }) => {
            onChange({
              pageNum,
              pageSize: target.value
            });
          }}
        />

        <Pagination
          className="ant-pagination ant-table-pagination ant-table-pagination-right ant-table-pagination-right"
          showSizeChanger
          showQuickJumper
          defaultCurrent={pageNum}
          current={pageNum}
          defaultPageSize={pageSize}
          total={total}
          showTotal={(total) => `总共 ${total} 条`}
          // rowKey={rowKey}
          rowKey={(record) => record.uid}
          {...paginationProps}
          onChange={(pageNum, pageSize) => {
            onChange({
              pageNum,
              pageSize
            });
          }}
        />
      </div>
    </div>
  );
};

export default Index;
