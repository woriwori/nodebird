import { all, fork, takeLatest } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';
function loginAPI() {
    // 서버에 http 요청 보내는 부분
}
function* login() {
    try {
        yield call(loginAPI); // call 하고 서버에서 성공 응답 받으면 아래 실행, 실패면 catch 로 감.
        yield put({
            // put 은 디스패치와 동일
            type: LOG_IN_SUCCESS,
        });
    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}
function* watchLogin() {
    yield takeLatest(LOG_IN, login);
    // takeLatest 는 LOG_IN 이 디스패치되길 기다리다가, 디스패치 되면 login generator를 호출
    // 즉, LOG_IN 액션이 실행되서 state가 바뀌기 전에 끼어들어서 SUCCESS 또는 FAILURE 를 실행하는 거다.
}
export default function* userSaga() {
    yield all([fork(watchLogin)]);
}
