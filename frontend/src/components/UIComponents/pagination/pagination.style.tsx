import styled from "styled-components";

import { Pagination } from "antd";

export const PaginationContainer = styled.div`
  padding-top: 8rem;
`;

export const PaginationElement = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .ant-pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.8rem;
    width: 4.8rem;
    border: 2px solid #cc704b;
    border-radius: 999px;
    transition: all 0.3s !important;

    a {
      transition: all 0.3s !important;
      font-size: 1.8rem;
      font-weight: 600;
      color: #cc704b;
    }

    &:hover {
      background-color: #cc704b !important;
      a {
        color: #faf2e5;
      }
    }
  }

  .ant-table-wrapper .ant-table-pagination.ant-pagination {
    display: flex;
    align-items: center;
  }

  .ant-pagination-item-active {
    background-color: #cc704b;
    border-radius: 999px;
    border-color: #cc704b;

    a {
      font-size: 1.8rem;
      font-weight: 600;
      color: #faf2e5;
    }

    &:hover {
      border-color: #cc704b;
      a {
        color: #faf2e5;
      }
    }
  }

  .ant-pagination-item-link {
    .anticon {
      svg {
        width: 2.2rem;
        height: 2.2rem;
        transition: all 0.3s;
        fill: #cc704b;
      }
    }

    &:hover {
      .anticon svg {
        width: 2.4rem;
        height: 2.4rem;
        fill: #b86544;
      }
    }
  }

  :where(.css-dev-only-do-not-override-ixblex).ant-pagination
    .ant-pagination-jump-prev
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis,
  :where(.css-dev-only-do-not-override-ixblex).ant-pagination
    .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: #cc704b !important;
  }

  :where(.css-dev-only-do-not-override-ixblex).ant-pagination
    .ant-pagination-prev
    .ant-pagination-item-link,
  :where(.css-dev-only-do-not-override-ixblex).ant-pagination
    .ant-pagination-next
    .ant-pagination-item-link {
    &:hover {
      background-color: transparent !important;
    }
  }
`;
