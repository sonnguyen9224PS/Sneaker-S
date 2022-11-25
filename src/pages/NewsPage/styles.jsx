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
  .imgNews {
    &:hover {
      & img {
        opacity: 0.8;
      }
    }
  }
  .ttlNews {
    &:hover {
      color: red;
    }
  }
`;
