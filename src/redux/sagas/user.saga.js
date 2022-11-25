import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";
import { USER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/login`, data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    if (result.data?.user?.role === "user") {
      yield callback.gotoHome();
    } else {
      yield callback.gotoDashboard();
    }
    yield notification.success({
      message: "Đăng nhập thành công!",
      icon: (
        <i style={{ color: "goldenrod" }} class="fa-solid fa-lock-open"></i>
      ),
    });
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.LOGIN),
      payload: {
        error: "Email hoặc password sai, vui lòng kiểm tra lại!",
      },
    });
  }
}

function* registerSaga(action, callback) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/register`, data);
    yield put({
      type: SUCCESS(USER_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    yield callback.goToLogin();
    yield notification.success({
      message: "Đăng ký tài khoản thành công!",
      placement: "topRight",
    });
  } catch (e) {
    notification.error({
      message: "Login failed!",
    });
    yield put({
      type: FAIL(USER_ACTION.REGISTER),
      payload: {
        error:
          e.response?.data === "Email already exists"
            ? "Email đã tồn tại!"
            : e.response?.data,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_INFO),
      payload: {
        error: e.response?.data,
      },
    });
  }
}

function* updatePasswordSaga(action) {
  try {
    const { password, id, callBack } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: password,
    });
    yield put({
      type: SUCCESS(USER_ACTION.UPDATE_PASSWORD),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({
      message: "Thay đổi mật khẩu thành công!",
    });
    yield localStorage.removeItem("accessToken");
    yield callBack.gotoLogin();
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.UPDATE_PASSWORD),
      payload: {
        error: e.response?.data,
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.UPDATE_PASSWORD), updatePasswordSaga);
}
