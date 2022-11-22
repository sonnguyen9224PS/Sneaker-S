import styled from "styled-components";
export const HeaderContainerWrapper = styled.header`
  position: sticky;
  font-family: "Fredoka", sans-serif;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  height: 94.6px;
`;
export const HeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
  .logo {
    font-size: 2.2rem;
    font-weight: bold;
    text-transform: uppercase;
    background: linear-gradient(to right, #30cfd0 0%, #ff0080 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const HeaderRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 20px;
  padding-right: 20px;
`;
export const MenuHamburger = styled.div`
  align-items: center;
  justify-content: center;
  font-size: 26px;
  display: none;
  button {
    background: none;
    border: none;
    outline: none;
  }
  @media only screen and (max-width: 1106px) {
    display: flex;
  }
`;

export const HeaderRightTop = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  .contact {
    &:hover {
      scale: 1.05;
    }
  }
  .headerRightLogin {
    display: flex;
    align-items: center;
    margin-left: 20px;
    .btnLogin{
      margin-right: 4px;
        &:hover {
      scale: 1.05;
      }
    }
    .userNameLoginAfter{
      cursor: default;
      margin-right: 12px;
      &:hover {
        scale: 1.05;
      }
    }
  }
    
  }
  .cart {
    font-size: 22px;
    &:hover {
      cursor: pointer;
      scale: 1.05;
    }
   
`;
export const HeaderRightDown = styled.div`
  display: flex;
  justify-content: flex-end;
  .mainMenu {
    padding-left: 0;
    margin-right: 2rem;
    text-transform: uppercase;
    list-style-type: none;
    margin-bottom: 0;
    & > li {
      position: relative;
      display: inline-block;
      padding-right: 17.5px;
      padding-left: 17.5px;
      font-weight: 700;
      font-size: 17px;
      text-transform: uppercase;
      line-height: 40px;
      letter-spacing: 2.2px;
      color: #000;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 51%;
        right: 51%;
        height: 2px;
        background-color: #b93d3d;
      }
      &:first-child {
        font-size: 17px;
        & > span {
          font-weight: bold;
        }
        &:hover {
          & > span {
            color: "#232222";
          }
        }
      }
      &:hover {
        cursor: pointer;
        color: #b9142c;
        transition: all 0.3s;
        &:after {
          left: 1rem;
          right: 1rem;
          transition: all 0.3s;
        }
      }
    }
    .dropDown {
      position: relative;
      line-height: 40px;
      &:hover {
        & .rotateIcon {
          color: #293341;
          transform: rotate(180deg);
          transition: all 0.3s;
        }
        .subMenuSneaker {
          visibility: visible;
          opacity: 0.9;
        }
      }
      list-style-type: none;
      .subMenuSneaker {
        background-color: #fff;
        transition: all 0.3s ease-in-out 0.1s;
        width: 206px;
        padding: 15px 0 15px;
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 200;
        opacity: 0;
        border: 1px solid #e6e6e6;
        box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
        & li {
          font-size: 14px;
          line-height: 21px;
          padding: 6px 27px 6px 22px;
          display: block;
          font-weight: bolder;
          color: #000;
          &:hover {
            cursor: pointer;
            color: #fff;
            background-color: #000;
          }
        }
      }
      .dropSale {
        & > li {
          &:hover {
            color: red;
          }
        }
      }
    }
    .dropSale {
    }
  }
  @media only screen and (max-width: 1106px) {
    display: none;
  }
`;
