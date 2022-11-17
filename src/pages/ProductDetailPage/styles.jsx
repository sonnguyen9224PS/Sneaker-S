import styled from "styled-components";

export const DetailWrapper = styled.div`
  font-family: "Fredoka", sans-serif;

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
`;
export const PreviewSwipeWrap = styled.div`
  .swiper {
    width: 100%;
    height: auto;
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
