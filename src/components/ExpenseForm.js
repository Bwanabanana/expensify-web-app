import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates-temp';

export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <form
                className="form"
                onSubmit={this.onSubmit}
            >
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    autoFocus
                    className="text-input"
                    onChange={this.onDescriptionChange}
                    placeholder="Description"
                    text="text"
                    value={this.state.description}
                />
                <input
                    className="text-input"
                    onChange={this.onAmountChange}
                    placeholder="Amount"
                    type="text"
                    value={this.state.amount}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    displayFormat="DD/MM/YYYY"
                    focused={this.state.calendarFocused}
                    isOutsideRange={(day) => false}
                    numberOfMonths={1}
                    onDateChange={this.onDateChange}
                    onFocusChange={this.onFocusChange}
                />
                <textarea
                    className="textarea"
                    onChange={this.onNoteChange}
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                />
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
}
