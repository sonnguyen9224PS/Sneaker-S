import styled from "styled-components";

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Fredoka", sans-serif;
  width: 100%;
  background-image: url(https://file.hstatic.net/200000384421/article/thiet_ke_chua_co_ten_-_2022-10-18t151215.920_5741cbb89ede46a0b65aee7c5590712b_1024x1024.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  button {
    &:hover {
      color: black;
      background-color: white;
      font-weight: bold;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
