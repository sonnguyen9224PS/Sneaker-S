import styled from "styled-components";

export const Profile = styled.div`
  .ant-tabs-nav-list {
    .ant-tabs-tab {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 20px;
        height: 20px;
        background: url(https://cdn-icons-png.flaticon.com/512/5499/5499206.png);
        background-size: contain;
        background-repeat: no-repeat;
        transform: translateY(-50%);
      }
    }
    .ant-tabs-tab-btn {
      padding-left: 6px;
    }
  }
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
