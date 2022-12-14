import styled from "styled-components";

export const NewsWrapper = styled.div`
  font-family: "Fredoka", sans-serif;
  margin-bottom: 48px;

  .content {
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
    -webkit-line-clamp: 3;
    height: 75px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
  .contentDetail {
    & img {
      width: 100%;
    }
  }
  .imgItem {
    &:hover {
      & img {
        opacity: 0.8;
      }
    }
  }
  .ttlItem {
    &:hover {
      color: red;
    }
  }
`;
