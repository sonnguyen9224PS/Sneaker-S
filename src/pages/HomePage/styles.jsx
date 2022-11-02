import styled from "styled-components";

export const MainWrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  min-height: calc(100vh - 570px);
  background-color: var(--pastel-purple);
`;
export const CarouselWrapper = styled.div`
  .customCarousel {
    margin-bottom: 35px;
    background-image: url(https://image-cdn.hypb.st/https%3A%2F%2Fbae.hypebeast.com%2Ffiles%2F2021%2F08%2Fsole-searching-seoul-korea-best-womens-sneakers-shopping-2.jpg?w=1600&cbr=1&q=90&fit=max);
    background-size: contain;
    & > .slick-dots li button {
      width: 20px;
      height: 20px;
      border-radius: 100%;
    }
    & > .slick-dots li.slick-active button {
      width: 21px;
      height: 21px;
      border-radius: 100%;
      background-color: #4158d0;
      background-image: linear-gradient(
        43deg,
        #4158d0 0%,
        #c850c0 46%,
        #ffcc70 100%
      );
    }
  }
  .contentCarousel {
    position: relative;
    width: 100%;
    height: 450px;
    & > img {
      width: 810px;
      height: 100%;
      margin: auto;
    }
    &:nth-child(4) {
      & > img {
        width: 100%;
      }
    }
  }
  .shoppingBtn {
    position: absolute;
    bottom: 0;
    left: 250px;
    right: 0;
    color: #fff;
    & > a {
      margin-right: 8px;
      border-radius: 5px;
      background: #bb0909;
      border-color: #bb0909;
      color: #fff;
      display: inline-block;
      padding: 6px 12px;
      font-size: 11px;
      font-weight: bold;
      position: relative;
      overflow: hidden;
    }
  }
`;
export const OtherBrandWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 124px;
  width: 100%;
  padding: 12px 0;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  .otherContent {
    width: 16.6%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    &:hover {
      scale: 1.25;
      transition: all 0.3s;
    }
    & img {
      max-height: 96px;
      width: 100%;
    }
  }
`;

export const SaleOffWrapper = styled.div`
  .saleTittle {
    padding: 10px 0;
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: red;
  }
`;

export const ArrivalWrapper = styled.div`
  .newTittle {
    padding: 10px 0;
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
  .moreBtn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 60px;
    color: #6a6a6a;
    font-weight: bold;
    .anticon {
      margin-left: 3px;
    }
    &:hover {
      margin-right: 57px;
      transition: all 0.3s;
    }
  }
  .cardItem {
    position: relative;
    &::before {
      position: absolute;
      content: "NEW";
      width: 78px;
      height: 28px;
      top: 0;
      right: 0;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
    }
  }
`;
