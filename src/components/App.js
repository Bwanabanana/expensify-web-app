import React from 'react';
import { Provider } from 'react-redux';
// import { Auth } from 'aws-amplify';
import AppRouter from '../routers/AppRouter';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import configureStore from '../store/configureStore';
import { loadExpenses } from '../actions/expenses';

const store = configureStore();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        store.dispatch(loadExpenses()).then(() => {
            this.setState({ loading: false });
        });
    }

    componentDidCatchError(error, info) {
        console.log('Stack', info.componentStack);
        console.log('Error', error);
    }

    render() {

        return (
            <div>
                <AmplifySignOut />
                {this.state.loading
                    ?
                    <h2>Loading...</h2>
                    :
                    <Provider store={store}>
                        <AppRouter />
                    </Provider>
                }
            </div>
        )
    }
}

export default withAuthenticator(App, { includeGreeting: true, initialAuthState: 'signin' });