import styled from "styled-components";

export const DetailWrapper = styled.div`
  min-height: calc(100vh - 205px);
  .ant-row {
    width: 100%;
  }
  .thumbnails {
    justify-content: center;
  }
  .thumbnail {
    height: 4rem;
  }
  .ant-breadcrumb {
    & > ol {
      & > li {
        &:last-child {
          cursor: default;
          pointer-events: none;
        }
      }
    }
  }
`;
