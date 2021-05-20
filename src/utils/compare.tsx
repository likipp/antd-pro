import { LineValues } from '@/pages/kpi/dashboard/data';

function CompareWithArray(data: LineValues[]) {
  const arr: number[] = [];
  data.forEach((item: any) => {
    arr.push(item.value);
  });
  return {
    tMax: Math.max(...arr),
    tMin: Math.min(...arr),
    tLen: arr.length,
  };
}
export { CompareWithArray };
