import uuid from 'uuid';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default expenses values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: expenses[1].id });
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: -1 });
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: uuid(),
        description: 'Crisps',
        note: 'Very expensive crisps',
        amount: 5000,
        createdAt: 100
    };
    const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense });
    expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
    const updates = {
        description: 'Crisps',
        note: 'Very expensive crisps',
        amount: 5000,
        createdAt: 100
    };
    const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', id: expenses[0].id, updates });
    expect(state[0]).toEqual({ id: expenses[0].id, ...updates });
});

test('should not edit expense if expense not found', () => {
    const updates = {
        description: 'Crisps'
    };
    const state = expensesReducer(expenses, { type: 'EDIT_EXPENSE', id: -1, updates });
    expect(state).toEqual(expenses);
});
