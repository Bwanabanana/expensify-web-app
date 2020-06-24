import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import filters from '../fixtures/filters';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary with no expenses', () => {
    const wrapper = shallow(<ExpensesSummary numExpenses={1} expensesTotal={9434} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary numExpenses={2} expensesTotal={9434} />);
    expect(wrapper).toMatchSnapshot();
});