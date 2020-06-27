import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import uuid from 'uuid';
import {
    addExpense, addExpenseAction,
    editExpense, editExpenseAction,
    removeExpense, removeExpenseAction,
    setExpenses, setExpensesAction
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
    const store = createMockStore({});
    const expense = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(addExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        });
        done(); // force jest to wait for async func to complete

        // test to check for dynamo data shoud be here. The done
        // call may need to be inside the promise for a data pull
    });
});

test('should add expense with defaults to database', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(addExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        // test to check for dynamo data shoud be here. The done
        // call may need to be inside the promise for a data pull

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
        // test to check for dynamo data shoud be here. The done
        // call may need to be inside the promise for a data pull

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
    const expense = {
        description: 'Modified mouse',
        amount: 40000,
        note: 'This one is even better',
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
        // test to check for dynamo data shoud be here. The done
        // call may need to be inside the promise for a data pull

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
    })
});

test('should set expenses from database', (done) => {
    const store = createMockStore({});
    store.dispatch(setExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: storeExpenses
        });
        done();
    });
});