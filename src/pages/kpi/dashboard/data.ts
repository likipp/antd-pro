export interface TableListItem {
  id: string;
  // uuid?: string;
  dept?: string;
  name: string;
  uLimit?: string;
  tValue?: string;
  lLimit?: string;
  // unit?: string;
}

export interface TableListParams {
  dept?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
