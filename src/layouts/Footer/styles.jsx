import styled from "styled-components";
export const FooterWrapper = styled.footer`
  height: 440px;
  font-family: "Fredoka", sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ContactFooter = styled.div`
  width: 100%;
  .contactShop {
    font-size: 16px;
    .addressShopLeft {
      padding: 20px;
      padding-left: 35px;
      background-color: #f5f5f5;
      & > h3 {
        font-weight: bold;
        text-transform: uppercase;
        & > i {
          margin-right: 4px;
          font-size: 16px;
        }
      }
      & > p {
        & > i {
          margin-right: 4px;
          font-size: 16px;
        }
        &:hover {
          color: #c83535;
          & > i {
            color: #000;
          }
        }
      }
    }
    .contactShopRight {
      background-color: #eae8e8;
      h3 > i {
        margin-right: 4px;
      }
    }
  }
`;
export const ContainerFooter = styled.div`
  padding: 16px 31px;
  .followSocial {
    display: flex;
    & > a {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
      font-size: 30px;
      outline: none;
      &:hover {
        transform: rotate(360deg);
        color: #9254de;
        transition: all 1.5s;
      }
      & > i {
        font-size: 30px;
      }
    }
  }
`;
export const ShopInfo = styled.footer`
  width: 100%;
  font-size: 16px;
  h4 {
    font-size: 18px;
    margin-bottom: 28px;
  }
  .serviceShop {
    p {
      &:hover {
        color: #c83535;
      }
    }
    @media screen and (max-width: 767px) {
      .ant-col-xs-12 {
        text-align: center;
      }
    }
  }
`;
export const FooterPage = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #f6f6f8;
  p {
    margin: 0;
  }
`;
export const SignMail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 312px;
  background-image: url(https://theme.hstatic.net/200000384421/1000955298/14/ft_newsletter_bg.png?v=7);
  .signTtl {
    text-align: center;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  .formSign {
    position: relative;
    display: flex;
    width: 500px;
    .signInput {
      width: 500px;
      background: none;
      color: #fff;
    }
    .signBtn {
      position: absolute;
      right: 0;
      background: none;
      color: #fff;
      border: none;
      outline: none;
      &:hover {
        color: #50a5a6;
      }
    }
  }
`;
