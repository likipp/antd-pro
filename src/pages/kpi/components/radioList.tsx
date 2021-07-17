import { Radio } from "antd";
import React from "react";

const RadioList: React.FC<{
  value?: {
    status: number,
    unit: string,
    name: string
  };
  onChange?: (
    value: {
      status: number,
      unit: string,
      name: string
    },
  ) => void;
  onSave?: (
    value: {
      status: number
    },
  ) => void
}> = ({ value, onChange }) => {
  // const [value, setValue] = useState(3)
  return (
    <Radio.Group>
      <Radio value={1}>启用</Radio>
      <Radio value={2}>禁用</Radio>
    </Radio.Group>
  )
}

export default RadioList
