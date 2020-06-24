import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ numExpenses, expensesTotal }) => {
    const expenseWord = numExpenses == 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('£0,0.00');
    return (
        <div>
            <h1>Viewing {numExpenses} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesTotal: selectExpensesTotal(expenses),
        numExpenses: expenses.length
    };
}

export default connect(mapStateToProps)(ExpensesSummary);