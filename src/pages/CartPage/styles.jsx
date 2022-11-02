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
export const CartBody = styled.div`
  .tableCart {
    margin-bottom: 25px;
  }
  .totalMoney {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .backToshop {
      height: auto;
      color: #000;
      background-color: #f2f2f2;
      text-transform: uppercase;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
    .totalPay {
      display: flex;
      align-items: center;
      & > span {
        width: 100%;
      }
    }
  }
  .payBtn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 62px;
    & > button {
      background-color: #000;
      color: #fff;
      text-transform: uppercase;
    }
  }
`;

export const CartQuantity = styled.div`
  width: 8rem;
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
