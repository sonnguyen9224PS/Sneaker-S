import styled from "styled-components";

export const CheckOutWrapper = styled.div`
  padding: 20px;
  .infoCheckout {
    .infoHead {
      display: flex;
      justify-content: space-between;
      .infoTtl {
        font-size: 18px;
        font-weight: bold;
        line-height: 20px;
      }
    }
  }
  .transportPayment {
    .transport,
    .payment {
      h3 {
        width: 100%;
      }
    }
    .shipProduct,
    .paymentProduct {
      width: 100%;
      border: solid 1px var(--primaryBorderColor);
      border-radius: 5px;
      .shipOptionRadio,
      .paymentOptionRadio {
        width: 100%;
        i {
          font-size: 24px;
          color: var(--secondColor);
        }
        & > span:nth-child(2) {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .bankRadioGroup {
      label {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .ant-radio-button-wrapper {
        height: 70px;
      }
    }
  }
  .checkoutRight {
    .cartFinal {
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      height: 10rem;
      border-top: solid 1px var(--primaryBorderColor);
      border-bottom: solid 1px var(--primaryBorderColor);
      padding: 14px;
      .ant-scroll-number {
        background-color: #2a9dcc;
      }
      .cartItemImg {
        width: 55px;
        height: 55px;
        & img {
          vertical-align: middle;
          border-style: none;
          width: 100%;
          border-radius: 10px;
          border: solid 1px grey;
        }
      }
    }
  }
`;
