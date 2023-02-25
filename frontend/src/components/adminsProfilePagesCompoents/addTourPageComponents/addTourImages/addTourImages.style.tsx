import styled from "styled-components";

export const AddTourImagesContainer = styled.div`
  padding: 6.4rem;

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item-container,
  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload.ant-upload-select {
    width: 16rem;
    height: 16rem;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload.ant-upload-select {
    background-color: #faf2e5;
    color: #cc704b;
    border-color: #cc704b;

    &:hover {
      border-color: #b86544;
      color: #b86544;
    }
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item {
    border: solid 1px #cc704b;
  }

  .ant-upload-list-item.ant-upload-list-item-done:hover {
    background-color: #b86544;
  }

  .ant-upload-list-item-thumbnail:hover {
    background: #eee;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item-actions
    .anticon-eye,
  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item-actions
    .anticon-delete {
    width: 2.2rem;
    svg {
      color: #faf2e5;
      transition: all 0.3s;
      &:hover {
        color: #cc704b;
      }
    }
  }
`;
