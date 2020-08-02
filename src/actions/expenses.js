import uuid from 'uuid';
import { Auth } from 'aws-amplify';

export const addExpenseAction = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const addExpense = (expense = {}) => {
    return (dispatch) => {
        const {
            id = uuid(),
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expense;

        return Auth.currentSession().then((res) => {
            const cognitoToken = res.getIdToken();
            const jwt = cognitoToken.getJwtToken();
            return jwt;
        }).then((jwt) => {
            const url = `https://api.expensify.bwanabanana.com/expenses/${id}`;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                body: JSON.stringify({ description, note, amount, createdAt })
            };
            return fetch(url, options);
        }).then((response) => {
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

        return Auth.currentSession().then((res) => {
            const cognitoToken = res.getIdToken();
            const jwt = cognitoToken.getJwtToken();
            return jwt;
        }).then((jwt) => {
            const url = `https://api.expensify.bwanabanana.com/expenses/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            };
            return fetch(url, options);
        }).then((response) => {
            dispatch(removeExpenseAction(id));
        });
    };
};

export const editExpenseAction = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const editExpense = (id, updates) => {

    return (dispatch) => {

        return Auth.currentSession().then((res) => {
            const cognitoToken = res.getIdToken();
            const jwt = cognitoToken.getJwtToken();
            return jwt;
        }).then((jwt) => {
            const {
                description = '',
                note = '',
                amount = 0,
                createdAt = 0
            } = updates;

            const url = `https://api.expensify.bwanabanana.com/expenses/${id}`;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                body: JSON.stringify({ description, note, amount, createdAt })
            };
            return fetch(url, options);
        }).then((response) => {
            dispatch(editExpenseAction(id, updates));
        });
    };
};

export const setExpensesAction = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const loadExpenses = () => {
    return (dispatch) => {

        return Auth.currentSession().then((res) => {
            const cognitoToken = res.getIdToken();
            const jwt = cognitoToken.getJwtToken();
            return jwt;
        }).then((jwt) => {
            const url = 'https://api.expensify.bwanabanana.com/expenses';
            const options = {
                headers: {
                    Authorization: jwt
                }
            };
            return fetch(url, options);
        }).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            dispatch(setExpensesAction(json.expenses));
        });
    };
};


