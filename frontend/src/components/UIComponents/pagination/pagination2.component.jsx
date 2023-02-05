import { useState } from "react";
// import type { PaginationProps } from "antd";
import { PaginationContainer, PaginationElement } from "./pagination2.style";

const Pagination2 = () => {
  const [current, setCurrent] = useState(8);

  //   const onChange: PaginationProps["onChange"] = (page) => {
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <PaginationContainer>
      <PaginationElement
        current={current}
        onChange={onChange}
        total={600}
        defaultPageSize={16}
        defaultCurrent={1}
        showSizeChanger={false}
      />
    </PaginationContainer>
  );
};

export default Pagination2;
