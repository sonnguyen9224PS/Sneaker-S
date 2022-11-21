import styled from "styled-components";
import { Modal } from "antd";

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
      height: 12rem;
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
          border: none;
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
          color: gray;
          font-size: 15px;
          font-weight: normal;
          margin-left: 4px;
        }
        .salePrice {
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
      background-color: #b6bfc5;
      scale: 1.05;
      transition: all 0.3s;
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
  .itemTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16rem;
    padding: 10px 0;
    margin-bottom: 30px;
    box-shadow: 0 0 4px black;
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
    & h2 {
      position: relative;
    }
    & span {
      position: relative;
      display: inline-block;
      color: #fff;
      letter-spacing: 25.2px;
      font-size: 5rem;
      text-transform: uppercase;
      -webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
      animation: waviy 1s infinite;
      animation-delay: calc(0.1s * var(--i));
    }
    @keyframes waviy {
      0%,
      40%,
      100% {
        transform: translateY(0);
      }
      20% {
        transform: translateY(-20px);
      }
    }
  }
  .newTitle {
    background-image: url(https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
    background-size: cover;
    background-position: center;
    & > h2 {
      font-weight: bold;
      color: chartreuse;
      text-shadow: 0 0 9px black;
      letter-spacing: 8.2px;
      animation: text-flicker 4s linear infinite;
    }
    @keyframes text-flicker {
      0% {
        opacity: 0.1;
      }
      2% {
        opacity: 1;
      }
      8% {
        opacity: 0.1;
      }
      9% {
        opacity: 1;
      }
      12% {
        opacity: 0.1;
      }
      20% {
        opacity: 1;
      }
      25% {
        opacity: 0.3;
      }
      30% {
        opacity: 1;
      }

      70% {
        opacity: 0.7;
      }
      72% {
        opacity: 0.2;
      }
      77% {
        opacity: 0.9;
      }
      100% {
        opacity: 0.9;
      }
    }
  }
  .moreBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    padding: 22px 44px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    &:hover {
      .iconBtn {
        right: 21px;
        transition: all 0.3s;
      }
    }
  }
  .iconBtn {
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
  }
`;
export const CarouselWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
  margin-bottom: 35px;
`;
export const ArrivalWrapper = styled.div`
  margin-bottom: 35px;
  .productItem {
    &:before {
      content: "NEW";
      background-color: deepskyblue;
    }
    .productDescription .priceProduct .cost {
      font-weight: bold;
      text-decoration: none;
      color: black;
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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
export const SModal = styled(Modal)`
  .ant-modal-body {
    .ant-col-12:first-child {
      border: solid 1px #ebe1e1;
      border-color: purple;
      border-radius: 20px 0 0 20px;
      overflow: hidden;
      .swiper-slide {
        padding: 0 10px;
      }
      .mySwiper .swiper-slide {
        border: solid 1px purple;
      }
    }
    .ant-col-12:nth-child(2) {
      .ant-card-bordered {
        border-color: purple;
        border-radius: 0 0 20px;
      }
      .ant-card-head {
        border-color: purple;
      }
      .ant-card-head-title {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 18px;
        text-align: center;
      }
      .ant-card-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .ant-input-number {
        border-radius: 20px;
        border-color: purple;
        overflow: hidden;
        .ant-input-number-handler-wrap {
          margin-right: 12px;
        }
      }
      .ant-radio-group {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 6px;
        .ant-radio-button-wrapper {
          border: solid 1px purple;
          border-radius: 50%;
          margin-bottom: 3px;
          &:not(:last-child) {
            margin-right: 4px;
          }
          &:hover {
            color: red;
          }
        }
        .ant-radio-button-wrapper::before {
          display: none;
        }
      }
    }
  }
  .ant-modal-content {
    border-radius: 20px;
  }
  .ant-modal-close {
    background: url(https://www.citypng.com/public/uploads/preview/png-red-round-close-x-icon-31631915146jpppmdzihs.png);
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    color: red;
    font-weight: bold;
  }
  .buttons {
    .btn-hover {
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      text-align: center;
      border: none;
      background-size: 300% 100%;
      -moz-transition: all 0.4s ease-in-out;
      -o-transition: all 0.4s ease-in-out;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
    .btn-hover:hover {
      background-position: 100% 0;
      -moz-transition: all 0.4s ease-in-out;
      -o-transition: all 0.4s ease-in-out;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
    .btn-hover:focus {
      outline: none;
    }
    .btn-hover.color-7 {
      background-image: linear-gradient(
        to right,
        #6253e1,
        #852d91,
        #a3a1ff,
        #f24645
      );
      box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
    }
  }
`;

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
    border: solid 1px purple;
    border-radius: 10px;
    opacity: 0.6;
    overflow: hidden;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
    border-width: 3px;
    overflow: hidden;
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
  .newsImage {
    &:hover {
      opacity: 0.8;
    }
  }
`;
