import uuid from 'uuid';
import moment from 'moment';

export const addExpenseAction = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const addExpense = (expense = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expense;

        // dynamo call here
        const dynamoCall = new Promise((resolve, reject) => {
            resolve(uuid());
        });

        return dynamoCall.then((id) => {
            dispatch(addExpenseAction({ id, description, note, amount, createdAt }));
        });
    };
};

export const removeExpenseAction = (id) => ({
    type: 'REMOVE_EXPENSE',
    id //shorthand for id: id
});

export const removeExpense = (id) => {
    return (dispatch) => {

        // dynamo call here
        const dynamoCall = new Promise((resolve, reject) => {
            resolve(id);
        });

        return dynamoCall.then((id) => {
            dispatch(removeExpenseAction(id));
        });
    };
};

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const setExpensesAction = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const setExpenses = () => {
    return (dispatch) => {

        // dynamoDB call here
        const dynamoCall = new Promise((resolve, reject) => {

            const expenses = [{
                id: '1',
                description: 'Rent',
                note: 'You\'re paying my rent',
                amount: 150000,
                createdAt: moment().valueOf()
            }, {
                id: '2',
                description: 'Gas',
                note: 'It\'s a gas, gas gas',
                amount: 10000,
                createdAt: moment().add(1, 'day').valueOf()
            }, {
                id: '3',
                description: 'Travel',
                note: 'Travel to unravel',
                amount: 100000,
                createdAt: moment().add(2, 'day').valueOf()
            }];

            setTimeout(() => {
                resolve(expenses);
            }, 1000);
        });

        return dynamoCall.then((expenses) => {
            dispatch(setExpensesAction(expenses));
        });
    };
};


