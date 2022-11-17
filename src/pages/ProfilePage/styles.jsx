import styled from "styled-components";

export const Profile = styled.div`
  font-family: "Fredoka", sans-serif;

  .avatarRow {
    .avatarCol {
      display: flex;
      flex-direction: column;
      .ant-avatar-image {
        width: 150px;
        height: 150px;
        overflow: hidden;
      }
      .customFileUpload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        width: 8rem;
        border-radius: 20px;
        cursor: pointer;
      }
    }
    .ant-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: solid 2px black;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;
