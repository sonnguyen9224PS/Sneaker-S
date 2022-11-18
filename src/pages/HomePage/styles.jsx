import styled from "styled-components";

export const MainWrapper = styled.div`
  font-family: "Fredoka", sans-serif;
  min-height: calc(100vh - 570px);
  background-color: var(--pastel-purple);

  .productItem {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 16px;
    overflow: hidden;
    &::before {
      position: absolute;
      content: "SALE";
      width: 78px;
      height: 28px;
      top: 0;
      right: 0;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      z-index: 3;
    }
    .contentProduct {
      padding-left: 20px;
      padding-bottom: 16px;
    }
    .imageWrap {
      position: relative;
      height: 14rem;
      border-bottom: solid 1px #dad3d3;
      overflow: hidden;
      background-color: #fff;
      .imageItem {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        & > img {
          width: 80%;
        }
      }
      .actionProduct {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -42px;
        visibility: hidden;
        opacity: 0;
        & button {
          position: relative;
          height: 35px;
          width: 40px;
          border-radius: 6px;
          background: #8e8e8f;
          color: #fff;
          &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 6px;
            background-color: #d64760;
            height: 100%;
            width: 100%;
            visibility: hidden;
            opacity: 0;
          }
          &:hover {
            outline: none;
            border: none;
            background-color: #d64760;
            visibility: visible;
            opacity: 1;
            transition: all 0.3s;
          }
          &:first-child {
            margin-right: 6px;
          }
        }
      }
    }
    .nameProduct {
      text-transform: uppercase;
      padding-top: 6px;
      text-align: left;
      font-weight: bold;
      & > i {
        margin-right: 11px;
        color: black;
        font-size: 17px;
      }
    }
    .offProduct {
      margin: auto;
      padding: 2px;
      border: dashed 2px white;
      width: fit-content;
      background: #ff3800;
      color: #efefef;
      & > i {
        margin-right: 4px;
      }
    }
    .productDescription {
      display: flex;
      justify-content: start;
      .priceProduct {
        font-size: 17px;
        font-weight: bold;
        & > i {
          margin-right: 11px;
          color: black;
          font-size: 17px;
        }
        .cost {
          text-decoration: line-through;
        }
        .salePrice {
          margin-left: 5px;
          color: red;
        }
        .afterPrice {
          margin-left: 5px;
          color: #000;
        }
      }
    }
    .ratingProduct {
      margin: 0;
      text-align: left;
      & > i {
        font-size: 16px;
        color: black;
        margin-right: 8px;
      }
      & > span:first-child {
        margin-right: 16px;
      }
    }
    .soldProduct {
      margin: 0;
      display: flex;
      justify-content: start;
      & > i {
        font-size: 17px;
        color: black;
        margin-right: 4px;
      }
    }
    .authenProduct {
      & > i {
        margin-right: 4px;
        font-size: 17px;
        color: blue;
      }
    }
    &:hover {
      background-color: #d7dce0;
      scale: 1.05;
      .imageItem {
        & > img {
          scale: 1.15;
          transition: all 2.5s;
        }
      }
      .actionProduct {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .itemTittle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16rem;
    padding: 10px 0;
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: white;
    word-spacing: 6px;
    font-size: 4rem;
  }
  .saleTitle {
    background: url(https://imageio.forbes.com/specials-images/imageserve/6217ad1b151e231c69949c9c/0x0.jpg?format=jpg&width=1200);
    background-size: cover;
    background-position: center;
  }
  .moreBtn {
    font-size: 16px;
    margin-bottom: 20px;
    border-radius: 20px;
    &:hover {
      font-weight: bold;
    }
  }
`;
export const CarouselWrapper = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
  }
  .customCarousel {
    & > .slick-dots li button {
      width: 20px;
      height: 20px;
      border-radius: 100%;
    }
    & > .slick-dots li.slick-active button {
      width: 21px;
      height: 21px;
      border-radius: 100%;
      background-color: #000;
    }
  }
  .contentCarousel {
    position: relative;
    width: 100%;
    & > img {
      height: 100%;
      margin: auto;
    }
    &:nth-child(4) {
      & > img {
        width: 100%;
      }
    }
  }
  .shoppingDiv {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    & > a {
      position: relative;
      display: inline-block;
      padding: 4px 14px;
      margin-right: 25px;
      border-radius: 16px;
      background: #bb0909;
      border-color: #bb0909;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        transform: translateX(100%);
        width: 100%;
        height: 100%;
        z-index: 1;
        animation: slide 1.5s infinite 3s;
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(128, 186, 232, 0) 99%,
          rgba(125, 185, 232, 0) 100%
        );
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      }
      &:hover {
        .shoppingBtn {
        }
      }
    }
  }
`;
export const OtherBrandWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 124px;
  width: 100%;
  padding: 12px 0;
  background-color: #f9f9f9;
  .otherContent {
    width: 16.6%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    &:hover {
      scale: 1.15;
      transition: all 0.3s;
    }
    & img {
      max-height: 96px;
      width: 100%;
    }
  }
`;

export const SaleOffWrapper = styled.div`
  margin-bottom: 16px;
`;
export const ArrivalWrapper = styled.div`
  margin-bottom: 16px;
  .productItem {
    &:before {
      content: "NEW";
      background-color: deepskyblue;
    }
  }
`;
export const BannerCollection = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  background-size: cover;
  background-image: url(https://htmldemo.net/james/james/img/banner/banner-bg.jpg);
  background-position-x: 45%;
  .bannerCollection {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 660px;
    height: 300px;
    padding: 0 9rem;
    text-transform: uppercase;
    font-weight: bold;
    background-color: #fff;
    box-shadow: -20px -33px 1px #b7b2b2;
    &:hover {
      opacity: 0.8;
    }
    & > div {
      &:first-child {
        padding: 4px;
        border: solid;
      }
      &:nth-child(2) {
        font-size: 18px;
        color: #d51616;
      }
      &:nth-child(3) {
        font-size: 26px;
        text-align: center;
      }
      &:nth-child(4) {
        font-size: 20px;
        border: solid 2px #d51616;
        padding: 4px 10px;
        color: #d51616;
      }
    }
  }
  .containerBanner {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;
export const SignificantBrand = styled.div`
  margin-bottom: 30px;
  .brandItem {
    width: 210px;
    height: 210px;
    overflow: hidden;
    & > img {
    }
    &:hover {
      & > img {
        scale: 1.03;
        transition: all 0.8s;
      }
    }
  }
`;
export const ModalPreview = styled.div``;

export const PreviewSwipeWrap = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .mySwiper2 {
    height: 80%;
    width: 100%;
  }

  .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const NewsSwiper = styled.div`
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets
    .swiper-pagination-bullet {
    width: 15px;
    height: 15px;
  }
  .content {
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
    -webkit-line-clamp: 3;
    height: 75px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;
