import styled from "styled-components";
export const HeaderContainerWrapper = styled.header`
  height: 80px;
  background-color: #232222;
  font-family: "Fredoka", sans-serif;
  width: 100%;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 15px;
`;
export const HeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  & > a > img {
    border-radius: 50%;
  }
`;
export const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 20px;
`;
export const HeaderRightTop = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 14px;
  font-size: 16px;
  .contact {
    & > a {
      color: white;
    }
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
      color: #fff;
      &:hover {
      scale: 1.05;
      }
    }
    .userNameLoginAfter{
      cursor: default;
      color: white;
      margin-right: 6px;
      &:hover {
        scale: 1.05;
      }
    }
  }
    
  }
  .cart {
    font-size: 22px;
    color: white;
    &:hover {
      cursor: pointer;
      scale: 1.05;
    }
   
`;
export const HeaderRightDown = styled.div`
  display: flex;
  justify-content: flex-end;
  .mainMenu {
    text-transform: uppercase;
    list-style-type: none;
    margin-bottom: 0;
    & > li {
      display: inline-block;
      &:first-child > a {
        font-weight: bold;
        font-size: 16px;
      }
      &:hover {
        & > a {
          background-color: #e6e6e6;
          border-radius: 20px;
          color: black;
          & > span {
            color: #3a8f97;
          }
        }
      }
      & > a {
        display: block;
        position: relative;
        line-height: 40px;
        font-weight: 700;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 2.2px;
        padding-right: 17.5px;
        padding-left: 17.5px;
        color: white;
      }
    }
    .dropDown {
      position: relative;
      .subMenuSneaker {
        list-style-type: none;
      }
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
      .subMenuSneaker {
        background: #74ebd5;
        background: -webkit-linear-gradient(to right, #acb6e5, #74ebd5);
        background: linear-gradient(to right, #acb6e5, #74ebd5);
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
        border-radius: 20px;
        box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
        & li {
          &:hover {
            a {
              color: #fff;
            }
          }
          & a {
            font-size: 14px;
            line-height: 21px;
            padding: 6px 27px 6px 22px;
            display: block;
            font-weight: bolder;
          }
        }
      }
    }
  }
`;
