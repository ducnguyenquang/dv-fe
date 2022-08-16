/**
 *
 * ServiceTable
 *
 */
import { Pagination, Table } from 'antd';
import './style.less';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
export interface Props {
  page: number;
  pageSize: number;
  dataSource: Array<any>;
  isLoading: boolean;
  total?: number;
  columns: any[];
  onChangePagination: (page: number, pageSize: number) => void;
  onChange?: any;
  rowSelection?: any;
  onShowSizeChange?: (pageSize: number) => void;
}

export function ServiceTable(props: Props) {
  const { t } = useTranslation();

  return (
    <div className="table-container">
      <Table
        rowKey={row => row._id}
        loading={props.isLoading}
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={false}
        onChange={props.onChange}
        rowSelection={props.rowSelection}
      />
      {props.total && props.total > 0 ? (
        <Pagination
          total={props.total || 10}
          // showTotal={(total, range) => {
          //   return t('pagination.rangeData', {
          //     start: range[0] || 1,
          //     end: range[1] || props.pageSize,
          //     total,
          //   });
          // }}
          defaultPageSize={props.pageSize}
          current={props.page}
          onChange={(page, pageSize) =>
            props.onChangePagination(page, Number(pageSize))
          }
          showSizeChanger
          onShowSizeChange={(pageSize) => props?.onShowSizeChange?.(pageSize)}
        />
      ) : null}
    </div>
  );
}
