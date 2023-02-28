import React, { FC, useState } from "react";
import { ConfigProvider, Switch } from "antd";
import { SwitchInputContainer, SwitchInputValue } from "./switchInput.style";

export type SwitchInputProps = {
  switchInfos: [Info, Info];
  handleChange: (checked: boolean) => void;
};

const SwitchInput: FC<SwitchInputProps> = ({ switchInfos, handleChange }) => {
  const [selectedSecond, setSelectedSecond] = useState<boolean>(false);
  const onChange = (checked: boolean) => {
    setSelectedSecond(checked);
    handleChange(checked);
  };

  return (
    <SwitchInputContainer>
      <SwitchInputValue selected={!selectedSecond}>
        {switchInfos[0].value}
      </SwitchInputValue>
      <ConfigProvider
        theme={{
          hashed: false,
        }}
      >
        <Switch checked={selectedSecond} onChange={onChange} />
      </ConfigProvider>
      <SwitchInputValue selected={selectedSecond}>
        {switchInfos[1].value}
      </SwitchInputValue>
    </SwitchInputContainer>
  );
};

export default SwitchInput;
