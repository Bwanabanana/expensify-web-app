import uuid from 'uuid';

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

        // dynamo call here
        const dynamoCall = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });

        return dynamoCall.then(() => {
            dispatch(addExpenseAction({ id, description, note, amount, createdAt }));
        });
    };
};

export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id //shorthand for id: id
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});