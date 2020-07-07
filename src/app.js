import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Auth } from 'aws-amplify';
import App from './components/App';
import 'react-dates-temp/initialize';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates-temp/lib/css/_datepicker.css';

const ampConfig = Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_59mzxsHwL',
        userPoolWebClientId: '2dmom3jhfm11466uvk7lmp91br'
    }
});

ReactDOM.render(<App />, document.getElementById('app'));


