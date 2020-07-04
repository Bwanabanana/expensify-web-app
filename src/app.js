import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { setExpenses } from './actions/expenses';
import 'react-dates-temp/initialize';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates-temp/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(setExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});

