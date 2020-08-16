import React from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const Header = () => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>Expensify</h1>
                </Link>
                <AmplifySignOut />
            </div>
        </div>
    </header>
);

export default Header;