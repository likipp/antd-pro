import { ProColumns } from '@ant-design/pro-table';
import { TableListItem } from '@/pages/kpi/dashboard/data';

const reducer = (preState: { columns: ProColumns<TableListItem>[] }, action: any) => {
  switch (action.type) {
    case 'change':
      return { columns: action.payload };
    default:
      throw new Error('未知的操作类型, 请联系管理员');
  }
};

export default reducer;
