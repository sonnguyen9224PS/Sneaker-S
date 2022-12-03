import styled from "styled-components";
import { Card, Modal } from "antd";

export const DetailWrapper = styled.div`
  font-family: "Fredoka", sans-serif;
  padding: 0 16px 16px;
  min-height: calc(100vh - 205px);
  .ant-row {
    width: 100%;
  }
  .thumbnails {
    justify-content: center;
  }
  .thumbnail {
    height: 4rem;
  }
  .ant-breadcrumb {
    & > ol {
      & > li {
        &:last-child {
          cursor: default;
          pointer-events: none;
        }
      }
    }
  }
  .detailCard {
    .ant-card-body {
      padding-bottom: 4rem;
      padding-top: 6px;
    }
    .detailTtl {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 24px;
    }
    .iconTtlRight {
      font-size: 17px;
      & i {
        color: #ea4b67;
        margin-right: 4px;
        font-size: 14px;
      }
    }
    .quantity {
      .ant-input-number {
        border: solid 1px purple;
        border-radius: 20px;
        overflow: hidden;
        .ant-input-number-handler-wrap {
          margin-right: 12px;
        }
      }
    }
    .ant-radio-group {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      margin-bottom: 16px;
      .ant-radio-button-wrapper {
        border: solid 1px purple;
        border-radius: 999px;
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
  .imgColLeft {
    @media screen and (max-width: 767px) {
      margin-bottom: 100px;
    }
  }
`;
export const CardComment = styled(Card)`
  .ant-card-head {
    border: none;
  }
  .ant-card-head-title {
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    border-bottom: solid 3px purple;
  }
  .itemComment {
    padding: 1rem 0;
    &:not(:last-child) {
      border-bottom: solid 1px #71adad;
    }
  }
  .ant-btn {
    &:hover {
      background-color: #69b0ab;
      color: #fff;
    }
  }
`;

export const ModalPreview = styled.div``;

export const ParityProduct = styled.div`
  & h3 {
    font-size: 22px;
    text-align: center;
    text-transform: uppercase;
    background: white;
    padding: 10px;
    border-radius: 30px;
  }
  .productItem {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
    border-radius: 16px;
    overflow: hidden;
    height: 100%;

    .contentProduct {
      padding: 12px;
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
      }
    }
    .offProduct {
      position: absolute;
      top: 8px;
      left: 8px;
      padding: 2px 6px;
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
        display: flex;
        flex-wrap: wrap;
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

  .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
    padding: 0 10px;
  }
  .mySwiper2 {
    height: 100%;
    width: 100%;
  }
  .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    border: solid 1px purple;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0.8;
  }
  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
    border: solid 3px purple;
    overflow: hidden;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SModal = styled(Modal)`
  .ant-modal-body {
    .ant-col-12:first-child {
      border: solid 1px #ebe1e1;
      border-color: purple;
      border-radius: 20px 0 0 20px;
      overflow: hidden;
      .mySwiper {
        height: 20%;
        box-sizing: border-box;
        padding: 0 10px;
      }
      .mySwiper .swiper-slide {
        width: 25%;
        height: 100%;
        border: solid 1px purple;
        border-radius: 10px;
        overflow: hidden;
        opacity: 1;
      }
      .mySwiper .swiper-slide {
        &:active,
        :focus {
          opacity: 1;
          border: solid 3px purple;
          overflow: hidden;
        }
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
          border-radius: 999px;
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
