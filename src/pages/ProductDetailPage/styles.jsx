import styled from "styled-components";

export const DetailWrapper = styled.div`
  min-height: calc(100vh - 205px);
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
