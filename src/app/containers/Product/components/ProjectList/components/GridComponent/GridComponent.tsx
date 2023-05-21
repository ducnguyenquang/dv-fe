import { List } from 'antd';
import { Project } from 'models/project';
// import Sider from 'antd/lib/layout/Sider';
// import React, { useState } from 'react';
// import { useIntl } from 'react-intl';
import { GridItemComponent } from '../GridItemComponent';
import './GridComponent.less';

interface IProps {
  projects: Project[];
}

const GridComponent = ({ projects }: IProps): JSX.Element => {
  // const intl = useIntl();
  
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      className="projectGridList"
      size="large"
      renderItem={(item: Project) => <GridItemComponent data={item} />}
    />
  );
};

export default GridComponent;
