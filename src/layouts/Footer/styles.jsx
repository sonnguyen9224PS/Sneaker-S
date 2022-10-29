import styled from "styled-components";

export const ContactFooter = styled.div`
  height: 200px;
  width: 100%;
  .contactShop {
    .contactShopLeft {
      background-color: #f5f5f5;
      .signMailForm {
        display: flex;
      }
    }
    .contactShopRight {
      background-color: #eae8e8;
    }
  }
`;

export const ContainerFooter = styled.div`
  padding: 16px 31px;
  & > h3 {
    border-top: solid 1px #c2bcbc;
    padding-top: 8px;
    & > i {
      margin-right: 4px;
    }
  }
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
        transition: all 0.5s;
      }
    }
  }
`;
export const FooterWrapper = styled.footer`
  font-family: "Fredoka", sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
  height: 480px;
`;
export const FooterTop = styled.div`
  height: 400px;
`;
export const FooterLeft = styled.div`
  background-color: #232222;
`;
export const FooterRight = styled.div`
  background-color: #1d1d1d;
`;
export const FooterBottom = styled.div`
  height: 80px;
  background-color: #141414;
`;
