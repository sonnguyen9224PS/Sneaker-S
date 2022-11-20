import styled from "styled-components";

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
    .detailTtl {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 24px;
    }
    .iconTtlRight {
      font-size: 17px;
      & i {
        color: #5fc1c1;
        margin-right: 4px;
        font-size: 14px;
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
    width: 80%;
    height: 100%;
    object-fit: contain;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: purple;
  }
`;
