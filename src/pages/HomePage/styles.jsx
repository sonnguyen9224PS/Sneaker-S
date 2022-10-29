import styled from "styled-components";

export const MainWrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  min-height: calc(100vh - 565px);
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
  h2.headerSale {
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px 0;
    margin-bottom: 30px;
    text-align: center;
    color: red;
  }
  .saleProducts {
    display: flex;
    justify-content: space-around;
    padding: 0 16px;
    .saleItem {
      width: 25%;
      padding: 0 15px;
      .saleItemTop {
        position: relative;
        background-color: #efefef;

        &::before {
          position: absolute;
          content: "SALE";
          width: 78px;
          height: 28px;
          top: 0;
          right: 0;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: red;
        }
        figure {
          height: 280px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        .actions {
          position: absolute;
          width: 300px;
          height: 35px;
          bottom: 0;
          left: 0;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          z-index: 99;
          & button,
          .preview {
            cursor: pointer;
            height: 100%;
            padding: 0px 20px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            color: #fff;
            background-color: #333333;
          }
        }
        &:hover {
          & img {
            scale: 0.8;
            transition: all 0.3s ease 0s;
          }
          .actions {
            visibility: visible;
            opacity: 1;
            transition: all 0.3s ease 0s;
          }
        }
      }
    }
  }
  .descriptionItem {
    .productName {
      padding-left: 5px;
      margin-bottom: 0;
      text-transform: uppercase;
      color: #6a6a6a;
    }
  }
  .moreSaleBtn {
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
`;
//
export const ArrivalWrapper = styled.div`
  h2.headerArrival {
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px 0;
    margin-bottom: 30px;
    text-align: center;
  }
  .arrivalProducts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 16px;
    .arrivalItem {
      width: 25%;
      padding: 0 15px;
      &:not(:nth-last-child(-n + 4)) {
        margin-bottom: 54px;
      }
      .arrivalItemTop {
        position: relative;
        background-color: #efefef;

        figure {
          height: 280px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        .actions {
          position: absolute;
          width: 300px;
          height: 35px;
          bottom: 0;
          left: 0;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          z-index: 99;
          & button,
          .preview {
            cursor: pointer;
            height: 100%;
            padding: 0px 20px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            color: #fff;
            background-color: #333333;
          }
        }
        &:hover {
          & img {
            scale: 0.8;
            transition: all 0.3s ease 0s;
          }
          .actions {
            visibility: visible;
            opacity: 1;
            transition: all 0.3s ease 0s;
          }
        }
      }
    }
  }
  .descriptionItem {
    .productName {
      padding-left: 5px;
      margin-bottom: 0;
      text-transform: uppercase;
      color: #6a6a6a;
    }
  }
  .moreArrivalBtn {
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
`;
