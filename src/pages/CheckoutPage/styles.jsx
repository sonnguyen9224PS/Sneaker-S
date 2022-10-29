import styled from "styled-components";

export const CartTittle = styled.div`
  padding: 38px 0;

  & > h1 {
    margin-bottom: 15px;
    font-size: 43px;
    font-weight: 500;
    line-height: 43px;
    color: #222222;
    text-align: center;
  }
  & > p {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #222222;
  }
`;
export const CartBody = styled.div``;

export const CartQuantity = styled.div`
  width: 6rem;
  height: 24px;
  margin: auto;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .downBtn,
  .upBtn {
    width: 30%;
    height: 100%;
    padding: 0;
  }
  .quantityInput {
    width: 40%;
    height: 100%;
    margin: 0 4px;
  }
`;
