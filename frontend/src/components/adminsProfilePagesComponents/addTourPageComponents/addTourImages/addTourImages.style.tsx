import styled from "styled-components";
import colors from "../../../../colors";

export const AddTourImagesContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 450px) {
    padding: 6.4rem 3.2rem;
  }
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
    background-color: ${colors.backgroundDark};
    color: ${colors.primary};
    border-color: ${colors.primary};

    &:hover {
      border-color: ${colors.primaryDark};
      color: ${colors.primaryDark};
    }
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item {
    border: solid 1px ${colors.primary};
  }

  .ant-upload-list-item.ant-upload-list-item-done:hover {
    background-color: ${colors.primaryDark};
  }

  .ant-upload-list-item-thumbnail:hover {
    background: ${colors.darkWhite};
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
      color: ${colors.backgroundDark};
      transition: all 0.3s;
      &:hover {
        color: ${colors.primary};
      }
    }
  }
`;

export const AddTourImagesTitle = styled.div``;

export const ErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  height: 2rem;
  color: ${colors.error};
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.6px;
`;
