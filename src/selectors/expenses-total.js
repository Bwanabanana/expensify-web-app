
export default (expenses = []) => {
    return expenses.map((expense) => {
        return expense.amount ? expense.amount : 0;
    }).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
}