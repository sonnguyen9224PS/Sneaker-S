import styled, { css } from "styled-components";

export const SidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ isShow }) => (isShow ? "0" : "-200px")};
  width: 200px;
  background-color: #d03c3c;
  overflow: hidden;
  transition: 0.3s all;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #c1272d;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #a21f23;
      border-right: 5px solid #e37171;

      &:hover {
        background-color: #a21f23;
      }
    `}
`;
