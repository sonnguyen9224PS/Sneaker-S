import React from "react";
import * as S from "./styles";
import { LoadingOutlined } from "@ant-design/icons";

function LoadingPage() {
  return (
    <S.LoadingWrapper>
      <LoadingOutlined style={{ fontSize: 40 }} />
    </S.LoadingWrapper>
  );
}

export default LoadingPage;
