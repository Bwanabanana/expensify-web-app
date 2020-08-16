import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'react-dates-temp/initialize';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates-temp/lib/css/_datepicker.css';

ReactDOM.render(<App className="box-layout" />, document.getElementById('app'));


