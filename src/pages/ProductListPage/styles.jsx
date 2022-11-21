import styled from "styled-components";
import { Breadcrumb, Collapse, Card, Input, Modal, Select } from "antd";

export const Wrapper = styled.div`
  font-family: "Fredoka", sans-serif;
  padding: 16px;
  min-height: calc(100vh - 570px);
  .bannerLeft {
    img {
      width: 100%;
    }
  }
  .leftFilter {
    .ant-card-body {
      border: solid 1px purple;
    }
    .ant-card-head {
      border: solid 1px purple;
    }
    .bestSellCard {
      .imgItem {
        &:hover {
          & img {
            opacity: 0.8;
          }
        }
      }
      .ttlItem {
        &:hover {
          color: red;
        }
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
`;
export const ProductListWrapper = styled.div`
  margin-bottom: 30px;
  .productItem {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 16px;
    overflow: hidden;

    .contentProduct {
      padding-left: 10px;
      padding-bottom: 10px;
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
        font-weight: bold;
        & > i {
          margin-right: 11px;
          color: black;
          font-size: 17px;
        }
        .cost {
          text-decoration: line-through;
          color: gray;
          font-weight: normal;
          margin-left: 4px;
        }
        .salePrice {
          margin-left: 5px;
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
`;
export const SBreadcrumb = styled(Breadcrumb)`
  .ant-breadcrumb {
    font-size: 16px;
  }
`;
export const SCardArrival = styled(Card)`
  .ant-card-body {
    border-radius: 10px 10px 0 0;
  }
  .ant-checkbox-wrapper {
    .ant-checkbox-inner {
      border-color: black;
    }
    &:hover {
      .ant-checkbox-inner {
        border-color: purple;
        border-width: 2px;
      }
      .ant-checkbox + span {
        color: purple;
      }
    }
  }
`;
export const SCollapse = styled(Collapse)`
  .ant-collapse-header,
  .ant-collapse-header-text,
  .ant-collapse-expand-icon {
    font-size: 17px;
    font-weight: 500;
  }
  .ant-checkbox-wrapper {
    width: 100%;
    .ant-checkbox-inner,
    .ant-radio-inner {
      border-color: black;
    }
    &:hover {
      .ant-checkbox-inner,
      .ant-radio-inner {
        border-color: purple;
        border-width: 2px;
      }
      .ant-checkbox + span {
        color: purple;
      }
    }
    .ant-checkbox + span {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .radioItem {
    &:hover {
      color: purple;
    }
  }
`;
export const SInputSearch = styled(Input)`
  &.ant-input-affix-wrapper {
    border-radius: 20px !important;
    overflow: hidden;
  }
  .ant-input {
    color: purple;
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
