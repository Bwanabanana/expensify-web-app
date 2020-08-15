import { Auth } from 'aws-amplify';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import uuid from 'uuid';
import {
    addExpense, addExpenseAction,
    editExpense, editExpenseAction,
    removeExpense, removeExpenseAction,
    loadExpenses, setExpensesAction
} from '../../actions/expenses';
import expenses, { storeExpenses } from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    // Throw test data into the database for testing
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        // data for dynamo
        expensesData[id] = { description, note, amount, createdAt };
    });

    // Mock out the Amplify Auth
    jest.spyOn(Auth, 'currentSession').mockImplementation(() => {
        return Promise.resolve({
            getIdToken: () => ({
                getJwtToken: () => ("Secret-Token")
            })
        });
    });

    done();
});

//
// ADD EXPENSES
//

test('should set up addExpense action obect with provided values', () => {
    const action = addExpenseAction(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('should add expense to database', (done) => {

    const id = uuid();

    global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve({ id })
        });
    });

    const store = createMockStore({});
    const expense = {
        description: 'Mouse',
        note: 'This one is better',
        amount: 3000,
        createdAt: 1000
    }
    store.dispatch(addExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id,
                ...expense
            }
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(expensesUrl(), addExpensePayload(expense));

        global.fetch.mockClear();
        delete global.fetch;

        done(); // force jest to wait for async func to complete
    });
});

test('should add expense with defaults to database', (done) => {

    const id = uuid();

    global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve({ id })
        });
    });

    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    store.dispatch(addExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id,
                ...expenseDefaults
            }
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(expensesUrl(), addExpensePayload(expenseDefaults));

        global.fetch.mockClear();
        delete global.fetch;

        done(); // force jest to wait for async func to complete
    });
});

//
// REMOVE EXPENSES
//

test('should set up removeExpense action object', () => {
    const action = removeExpenseAction('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from database store', (done) => {

    global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve({})
        });
    });

    const expense = {
        id: uuid(),
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    const store = createMockStore({ expenses: [expense] });

    store.dispatch(removeExpense(expense.id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expense.id
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(expensesUrl(expense.id), removeExpensePayload());

        global.fetch.mockClear();
        delete global.fetch;

        done(); // force jest to wait for async func to complete
    });
});

//
// EDIT EXPENSES
//

test('should set up editExpense action object', () => {
    const expense = { description: 'foo', note: 'some note', amount: 'bar', createdAt: moment().valueOf };
    const action = editExpenseAction('123abc', expense);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: expense
    });
});

test('should edit expense in database store', (done) => {

    global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve({})
        });
    });

    const expense = {
        description: 'Modified mouse',
        note: 'This one is even better',
        amount: 40000,
        createdAt: 6000
    }
    const store = createMockStore({ expenses: expenses });

    store.dispatch(editExpense(expenses[0].id, expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenses[0].id,
            updates: expense
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(expensesUrl(expenses[0].id), editExpensePayload(expense));

        global.fetch.mockClear();
        delete global.fetch;

        done(); // force jest to wait for async func to complete
    });
});

//
// SET EXPENSES
//

test('should setup setExpenses action object with data', () => {
    const action = setExpensesAction(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should load expenses from database', (done) => {

    global.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve({ expenses: storeExpenses })
        });
    });

    const store = createMockStore({});
    store.dispatch(loadExpenses()).then(() => {

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: storeExpenses
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(expensesUrl(), fetchExpensePayload());

        global.fetch.mockClear();
        delete global.fetch;

        done(); // force jest to wait for async func to complete
    });
});

const addExpensePayload = (expense) => {
    return {
        method: 'POST',
        headers: {
            'Authorization': "Secret-Token",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(expense)
    };
};

const removeExpensePayload = () => {
    return {
        method: 'DELETE',
        headers: {
            'Authorization': "Secret-Token",
            'Content-Type': "application/json"
        }
    };
};

const editExpensePayload = (expense) => {
    return {
        method: 'PUT',
        headers: {
            'Authorization': "Secret-Token",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(expense)
    };
};

const fetchExpensePayload = () => {
    return {
        method: 'GET',
        headers: {
            Authorization: "Secret-Token"
        }
    };
};

const expensesUrl = (expenseId) => {
    const defaultUrl = 'https://api.expensify.bwanabanana.com/expenses';
    if (expenseId === undefined) {
        return defaultUrl;
    } else {
        return defaultUrl + '/' + expenseId;
    }
}