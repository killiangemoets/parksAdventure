import styled from "styled-components";

export const AddTourImagesContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AddTourImagesWrapper = styled.div`
  width: 100%;
  max-width: 120rem;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

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

export const AddTourImagesTitle = styled.div``;

export const ErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  height: 2rem;
  color: #ff0033;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.6px;
`;
