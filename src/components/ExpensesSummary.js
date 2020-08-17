import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ numExpenses, expensesTotal }) => {
    const expenseWord = numExpenses == 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('£0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{numExpenses}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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