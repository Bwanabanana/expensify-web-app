const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            // could destructure the expense and remove parenthases if we wished
            // return state.filter(({ id }) => id !== action.id);
            return state.filter((expense) => (expense.id !== action.id));
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }

            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

