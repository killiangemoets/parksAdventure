import styled from "styled-components";

export const ProfilePictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;

  button {
    &:hover {
      text-decoration: underline;
    }
  }

  .ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item
    .ant-upload-list-item-name {
    max-width: 16rem;
  }
`;
