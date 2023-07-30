import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserTableContainer = styled.div`
  width: 100%;

  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-thead > tr > td {
    text-align: center;
    /* background-color: #cc704b; */
    /* color: #fff; */
    background-color: #faf2e5;
    border: 1px solid #ccc;
    font-weight: 700;
    margin-right: 2.25rem;
    font-size: 1.4rem;
    letter-spacing: 0.4px;
    width: 10rem;
  }

  .ant-table-cell {
    border: 1px solid #ccc;
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.4px;
    background-color: #fefcfa;
  }

  tr.ant-table-row {
    background-color: #cc704b !important;
  }

  .ant-pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.8rem;
    width: 3.8rem;
    border: 2px solid #cc704b;
    border-radius: 999px;
    transition: all 0.3s !important;

    a {
      transition: all 0.3s !important;
      font-size: 1.4rem;
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

  .ant-pagination-item-active {
    background-color: #cc704b;
    border-radius: 999px;
    border-color: #cc704b;

    a {
      font-size: 1.4rem;
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
        width: 1.6rem;
        height: 1.6rem;
        transition: all 0.3s;
        fill: #cc704b;
      }
    }

    &:hover {
      .anticon svg {
        width: 1.8rem;
        height: 1.8rem;
        fill: #b86544;
      }
    }
  }

  .ant-pagination {
    display: flex;
    align-items: center;
    height: revert;
    margin: 0;
  }

  .ant-pagination .ant-pagination-options {
    .ant-select-selector {
      padding: 1.2rem 3.2rem !important;

      font-size: 1.8rem !important;
      letter-spacing: 1px !important;
      background: none !important;
      border: solid 2px #cc704b !important;
      color: #cc704b !important;
      border-radius: 999px !important;
      cursor: pointer !important;

      transition: all 0.3s !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 1rem !important;
    }

    .anticon {
      color: #cc704b !important;
    }

    &:hover {
      .anticon {
        color: #fff !important;
      }

      .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        background-color: #cc704b !important;
        border: solid 2px #cc704b !important;
        color: #fff !important;
      }
    }
  }

  .ant-select-item.ant-select-item-option.ant-select-item-option-selected,
  .ant-select-item.ant-select-item-option.ant-select-item-option-active {
    background-color: #d68d6f;
    color: #fff;
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

  .ant-table-wrapper .ant-table-thead > tr > th,
  .fpgNTV .ant-table-wrapper .ant-table-thead > tr > td,
  .ant-table-wrapper .ant-table-column-title {
    font-size: 1.6rem;
  }

  @media (max-width: 620px) {
    .ant-table-cell {
      font-size: 1.2rem;
      letter-spacing: 0px;
    }
  }
`;

export const UserPictureContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  /* justify-content: center; */
`;

export const UserName = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.4px;

  @media (max-width: 620px) {
    font-size: 1.2rem;
    letter-spacing: 0px;
  }
`;

export const Tours = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Tour = styled(Link)`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: #cc704b;
  }
`;

export const Role = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: #cc704b;
  }
`;
