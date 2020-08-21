import React from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <h1 className="header__title">Expensify</h1>
                <Link className="header__title" to="/">
                    <h3>Home</h3>
                </Link>
                <Link className="header__title" to="/api">
                    <h3>API</h3>
                </Link>
                <Link className="header__title" to="/help">
                    <h3>Help</h3>
                </Link>
                <AmplifySignOut />
            </div>
        </div>
    </header>
);

export default Header;