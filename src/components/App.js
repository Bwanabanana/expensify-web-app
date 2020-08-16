import React from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import AppRouter from '../routers/AppRouter';
import { Authenticator } from 'aws-amplify-react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import configureStore from '../store/configureStore';
import { loadExpenses } from '../actions/expenses';

const ampConfig = Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_59mzxsHwL',
        userPoolWebClientId: '2dmom3jhfm11466uvk7lmp91br'
    }
});

const myTheme = {
    container: {
        'alignItems': 'center',
        'background': `url('images/bg.jpg')`,
        'backgroundSize': 'cover',
        'display': 'flex',
        'height': '100vh',
        'justifyContent': 'center',
        'width': '100vw'
    }
};

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
        if (this.state.loading) {
            return (
                <div>
                    <AmplifySignOut />
                    <h2>Retrieving Expenses...</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <AmplifySignOut />
                    <Provider store={store}>
                        <AppRouter />
                    </Provider>
                </div>
            )
        }
    }
}

const AppWithAuthenticator = withAuthenticator(App, false, []);

export default class AppWithAuth extends React.Component {
    render() {
        return (
            <Authenticator hideDefault={true} theme={myTheme}>
                <AppWithAuthenticator />
            </Authenticator>
        )
    }
}
