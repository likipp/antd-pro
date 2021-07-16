import { Radio } from "antd";
import React from "react";

const RadioList: React.FC<{
  value?: {
    status: string
  };
  onChange?: (
    value: {
      status: number
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
    <Radio.Group value={value}>
      <Radio value={1}>启用</Radio>
      <Radio value={2}>禁用</Radio>
    </Radio.Group>
  )
}

export default RadioList
