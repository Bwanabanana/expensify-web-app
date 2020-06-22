import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', note: 'my water bill', amount: 700, createdAt: 4500 }));
store.dispatch(addExpense({ description: 'Gas Bill', note: 'my gas bill', amount: 1700, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', note: 'my rent', amount: 900, createdAt: 100009 }));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
