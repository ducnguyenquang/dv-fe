
import { Pagination, Table } from 'antd';
import './style.less';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
export interface Props {
  page: number;
  pageSize: number;
  dataSource: any;
  isLoading: boolean;
  total?: number;
  columns: any[];
  onChangePagination: (page: number, pageSize: number) => void;
  onChange?: any;
  rowSelection?: any;
  onShowSizeChange?: (pageSize: number) => void;
}

export function ServiceTable(props: Props) {
  const intl = useIntl();
  const [data, setData] = React.useState(props.dataSource);

  useEffect(() => {
    setData(props.dataSource);
  }, [props.dataSource]);

  return (
    <div className="table-container">
      <Table
        rowKey={row => row._id}
        loading={props.isLoading}
        dataSource={data}
        columns={props.columns}
        pagination={false}
        onChange={props.onChange}
        rowSelection={props.rowSelection}
      />
      {props.total && props.total > 0 ? (
        <Pagination
          total={props.total || 10}
          showTotal={(total, range) => {
            return intl.formatMessage(
              { id: 'common.pagination.rangeData' },
              { 
                start: range[0] || 1,
                end: range[1] || props.pageSize,
                total,
              }
            )
          }}
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
