import { useMemo, useState } from 'react';
import type { LineValues } from '@/pages/kpi/dashboard/data';
import { CompareWithArray } from '@/utils/compare';

export default function useLine(values: LineValues[]) {
  const [lineMin, setLinMin] = useState(0);
  const [lineMax, setLinMax] = useState(0);
  let result: { tMax: number; tMin: number; tLen?: number };

  if (values != null) {
    result = CompareWithArray(values);
  }

  useMemo(() => {
    // if (!result.hasOwnProperty("tMax")) {
    //   return
    // }
    if (result === undefined) {
      return;
    }
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
  }, [values]);
  return [lineMin, lineMax];
}
