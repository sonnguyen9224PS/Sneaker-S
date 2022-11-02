import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 16px;
  min-height: calc(100vh - 570px);
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
  .bannerLeft {
    img {
      width: 100%;
    }
  }
`;
