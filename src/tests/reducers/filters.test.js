import moment from 'moment';
import filtersReducer from '../../reducers/filter';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortby to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortby to date', () => {
    const inputState = {
        sortBy: 'amount'
    };
    const state = filtersReducer(inputState, { type: 'SORT_BY_DATE' });
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'Cash';
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text });
    expect(state.text).toBe(text);
});

test('should set startDate filter', () => {
    const date = moment(0).add(2, 'days');
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', date });
    expect(state.startDate).toEqual(date);
});

test('should set endDate filter', () => {
    const date = moment(0).add(2, 'days');
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', date });
    expect(state.endDate).toEqual(date);
});
