import styled from "styled-components";

import { Pagination } from "antd";
import colors from "../../../colors";

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
    border: 2px solid ${colors.primary};
    border-radius: 999px;
    transition: all 0.3s !important;

    a {
      transition: all 0.3s !important;
      font-size: 1.8rem;
      font-weight: 600;
      color: ${colors.primary};
    }

    &:hover {
      background-color: ${colors.primary} !important;
      a {
        color: ${colors.backgroundDark};
      }
    }
  }

  .ant-table-wrapper .ant-table-pagination.ant-pagination {
    display: flex;
    align-items: center;
  }

  .ant-pagination-item-active {
    background-color: ${colors.primary};
    border-radius: 999px;
    border-color: ${colors.primary};

    a {
      font-size: 1.8rem;
      font-weight: 600;
      color: ${colors.backgroundDark};
    }

    &:hover {
      border-color: ${colors.primary};
      a {
        color: ${colors.backgroundDark};
      }
    }
  }

  .ant-pagination-item-link {
    .anticon {
      svg {
        width: 2.2rem;
        height: 2.2rem;
        transition: all 0.3s;
        fill: ${colors.primary};
      }
    }

    &:hover {
      .anticon svg {
        width: 2.4rem;
        height: 2.4rem;
        fill: ${colors.primaryDark};
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
    color: ${colors.primary} !important;
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

  @media (max-width: 1200px) {
    gap: 0rem;

    .ant-pagination-item {
      height: 4rem;
      width: 4rem;
      border: 1.5px solid ${colors.primary};

      a {
        font-size: 1.6rem;
        font-weight: 600;
      }
    }

    .ant-pagination-item-active {
      a {
        font-size: 1.6rem;
        font-weight: 600;
      }
    }

    .ant-pagination-item-link {
      .anticon {
        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
`;
