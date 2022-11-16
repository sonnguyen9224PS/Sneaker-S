import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 16px;
  min-height: calc(100vh - 570px);
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
  .bannerLeft {
    img {
      width: 100%;
    }
  }
`;
export const ProductListWrapper = styled.div`
  .productItem {
    position: relative;
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
    }
    .imageItem {
      position: relative;
      border-bottom: solid 1px #dad3d3;
      overflow: hidden;
      .actionProduct {
        display: flex;
        margin-top: -20px;
        padding-bottom: 15px;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        & button {
          position: relative;
          height: 35px;
          width: 40px;
          border-radius: 6px;
          background: #000;
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
      & > i {
        margin-right: 4px;
        color: #0050ff;
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
      justify-content: space-between;
      padding: 10px 0;
      .priceProduct {
        font-size: 17px;
        font-weight: bold;
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
      & > span:first-child {
        margin-right: 16px;
      }
    }
    &:hover {
      .imageItem {
        & > img {
          scale: 1.5;
          transition: all 3s;
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
