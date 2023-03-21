import { FC, useState } from "react";
import type { PaginationProps } from "antd";
import { PaginationContainer, PaginationElement } from "./pagination.style";

type PaginationElProps = {
  current: number;
  total: number;
  defaultPageSize: number;
  handleChange: (value: number) => void;
};
const Pagination: FC<PaginationElProps> = ({
  current,
  total,
  handleChange,
  defaultPageSize,
}) => {
  return (
    <PaginationContainer>
      <PaginationElement
        current={current}
        onChange={(page) => {
          handleChange(page);
        }}
        total={total}
        defaultPageSize={defaultPageSize}
        defaultCurrent={1}
        showSizeChanger={false}
      />
    </PaginationContainer>
  );
};

export default Pagination;
