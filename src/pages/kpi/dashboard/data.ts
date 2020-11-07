export interface TableListItem {
  key: number;
  uuid?: string;
  deptName?: string;
  kpiName: string;
  uLimit?: number;
  tValue?: number;
  rValue?: { [key: string]: number };
  unit?: string;
  '2020-08'?: number;
  '2020-09'?: number;
  '2020-10'?: number;
}
