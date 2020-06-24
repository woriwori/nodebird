import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from '../components/AppLayout';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const NodeBird = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
};

export default withRedux((initialState, options) => {
    const sageMiddeware = createSagaMiddleware();
    const middlewares = [sageMiddeware]; // redux에 없는 기능을 추가하고 싶을때 미들웨어를 사용
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware(...middlewares))
            : compose(
                  applyMiddleware(...middlewares),
                  !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
              ); // redux에서 기본제공되지않는 chrome의 redux devtools를 사용하기 위해 미들웨어를 사용하는 코드임!

    const store = createStore(reducer, initialState, enhancer);
    sageMiddeware.run(rootSaga);
    return store;
})(NodeBird);
