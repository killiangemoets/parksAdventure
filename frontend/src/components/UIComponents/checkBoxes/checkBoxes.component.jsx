import React, { useState } from "react";
import { ConfigProvider } from "antd";
import {
  CheckBoxAll,
  CheckBoxesContainer,
  CheckboxGroupElement,
} from "./checkBoxes.style";
// import type { CheckboxChangeEvent } from 'antd/es/checkbox';
// import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const CheckBoxes = ({ options, options2, defaultCheckedOptions = options }) => {
  // const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [checkedList, setCheckedList] = useState(defaultCheckedOptions);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  // const onChange = (list: CheckboxValueType[]) => {
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  // const onCheckAllChange = (e: CheckboxChangeEvent) => {
  const onCheckAllChange = (e) => {
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
              fontSize: "1.4rem",
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
