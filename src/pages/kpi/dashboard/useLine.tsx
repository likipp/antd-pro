import { useState } from 'react';
import { LineValues } from '@/pages/kpi/dashboard/data';
import { CompareWithArray } from '@/utils/compare';

export default function useLine(values: LineValues[]) {
  const [lineMin, setLinMin] = useState(0);
  const [lineMax, setLinMax] = useState(0);

  const result = CompareWithArray(values);
  setLinMax(() => {
    let value = result.tMax;
    if (value === 0) {
      value = 2;
    }
    return value;
  });
  setLinMin(() => {
    let value = result.tMin;
    if (value === 0) {
      value = -1;
    }
    return value;
  });
  return [lineMin, lineMax];
}
