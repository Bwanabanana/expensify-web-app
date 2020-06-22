import { createStore } from 'redux';

const add = ({ a, b }, c) => {
    return a + b + c;
}
console.log(add({ a: 1, b: 12 }, 100));

// Action functions

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy // shorthand for incrementBy: incrementBy
});
const incrementCountLonghand = ({ incrementBy = 1 } = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy: incrementBy
    }
};
const decrementCount = ({ decrementBy } = {}) => ({
    type: 'DECREMENT',
    decrementBy // shorthand for decrementBy: decrementBy
});
const resetCount = () => ({
    type: 'RESET'
});
const setCount = (count) => ({ // can just use a num rather than object
    type: 'SET',
    count
});

// Reducers
// 1. Pure functions (stateless)
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.incrementBy };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return { count: state.count - decrementBy };
        case 'RESET':
            return { count: 0 };
        case 'SET':
            return { count: action.count };
        default:
            return state;
    }
};

const store = createStore(countReducer);

// Use Action functions on reduceer

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCountLonghand({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount(101));
