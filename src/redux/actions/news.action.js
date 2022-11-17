import { createAction } from "@reduxjs/toolkit";
import { NEWS_ACTION, REQUEST } from "../constants";

export const getNewsListAction = createAction(
  REQUEST(NEWS_ACTION.GET_NEWS_LIST)
);
export const getNewsDetailAction = createAction(
  REQUEST(NEWS_ACTION.GET_NEWS_DETAIL)
);
