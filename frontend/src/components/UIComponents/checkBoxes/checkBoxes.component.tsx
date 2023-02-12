import React, { FC, useState } from "react";
import { ConfigProvider } from "antd";
import {
  CheckBoxAll,
  CheckBoxesContainer,
  CheckboxGroupElement,
} from "./checkBoxes.style";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

type CheckBoxesProps = {
  options: string[];
  defaultCheckedOptions?: string[];
};

const CheckBoxes: FC<CheckBoxesProps> = ({
  options,
  defaultCheckedOptions = options,
}) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(
    defaultCheckedOptions
  );
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <CheckBoxesContainer>
      <ConfigProvider
        theme={{
          components: {
            Checkbox: {
              colorPrimary: "#506044",
              colorBorder: "#ccc",
              colorPrimaryHover: "#404d36",
              fontSize: 14,
            },
          },
        }}
      >
        <CheckboxGroupElement
          options={options}
          value={checkedList}
          onChange={onChange}
        />
        <CheckBoxAll
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Select all
        </CheckBoxAll>
      </ConfigProvider>
    </CheckBoxesContainer>
  );
};

export default CheckBoxes;
