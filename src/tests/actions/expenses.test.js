import moment from 'moment';
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should set up remove expense action object', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should set up edit expense action object', () => {
    const expense = { description: 'foo', note: 'some note', amount: 'bar', createdAt: moment().valueOf };
    const action = editExpense('123abc', expense);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: expense
    });
});

test('should set up add expense action obect with provided values', () => {
    const expense = { description: 'foo', note: 'some note', amount: 'bar', createdAt: moment().valueOf };
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expense
        }
    });
});

test('should set up add expense action obect with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});
