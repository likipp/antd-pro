import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
import * as allIcons from '@ant-design/icons';

// FIX从接口获取菜单时icon为string类型
const fixMenuStruct = (menus: MenuDataItem[], iconType = 'Outlined'): MenuDataItem[] => {
  menus.forEach((item) => {
    console.log(item)
    if (item.parent_id === "") {
      // eslint-disable-next-line no-param-reassign
      delete item.component
      delete item.parent_id
      delete item.parent_path
    } else {
      delete item.routes
    }
    const { icon, routes } = item;
    if (typeof icon === 'string') {
      const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
      // eslint-disable-next-line no-param-reassign
      item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions,no-param-reassign
    routes && routes.length > 0 ? (item.children = fixMenuStruct(routes)) : null;
  });
  return menus;
};

export default fixMenuStruct;
