// Higher Order Component - A component (HOC) that renders another component 
// Reuse code
// Redner hijacking
// Prop manipulation
// Abstract state
// (seems like cross-cutting concern)

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is : {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info.  Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthenticatoin = (WrappedComponet) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponet {...props} /> : <p>Please authenticate yourself to see this component!</p>}
        </div>
    );
};

const AuthInfo = requireAuthenticatoin(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById('app'));
