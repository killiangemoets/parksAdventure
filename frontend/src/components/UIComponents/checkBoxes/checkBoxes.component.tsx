import React, { FC, useState } from "react";
import { ConfigProvider } from "antd";
import {
  CheckBoxAll,
  CheckBoxesContainer,
  CheckboxGroupElement,
} from "./checkBoxes.style";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

export type CheckBoxesProps = {
  options: Info[];
  allowSelectAll?: boolean;
  selection: Info[];
  handler: (infos: Info[]) => void;
};

const CheckBoxes: FC<CheckBoxesProps> = ({
  options,
  allowSelectAll = false,
  selection,
  handler,
}) => {
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const onChange = (list: CheckboxValueType[]) => {
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);

    const newSelection = options.filter((option) => {
      return list.find((listElement) => listElement === option.value);
    });
    handler(newSelection);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    handler(e.target.checked ? options : []);
  };

  return (
    <CheckBoxesContainer>
      <ConfigProvider
        theme={{
          hashed: false,
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
          options={options.map((option) => option.value?.toString() || "")}
          value={selection.map(
            (selection) => selection.value?.toString() || ""
          )}
          onChange={onChange}
        />
        {allowSelectAll && (
          <CheckBoxAll
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Select all
          </CheckBoxAll>
        )}
      </ConfigProvider>
    </CheckBoxesContainer>
  );
};

export default CheckBoxes;
