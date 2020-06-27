import moment from 'moment';

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 3000,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 1000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 2000,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

export const storeExpenses = [{
    id: '1',
    description: 'Rent',
    note: 'You\'re paying my rent',
    amount: 150000,
    createdAt: moment().valueOf()
}, {
    id: '2',
    description: 'Gas',
    note: 'It\'s a gas, gas gas',
    amount: 10000,
    createdAt: moment().add(1, 'day').valueOf()
}, {
    id: '3',
    description: 'Travel',
    note: 'Travel to unravel',
    amount: 100000,
    createdAt: moment().add(2, 'day').valueOf()
}];