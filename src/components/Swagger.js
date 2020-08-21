import React from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import SwaggerUI, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import spec from 'js-yaml-loader!../openapi/openapi.yml';

class Swagger extends React.Component {

    componentDidMount() {
        Auth.currentSession().then((res) => {
            const cognitoToken = res.getIdToken();
            const key = cognitoToken.getJwtToken();

            const ui = SwaggerUI({
                dom_id: '#swaggerContainer',
                spec: spec,
                presets: [presets.apis],
                onComplete: () => {
                    ui.preauthorizeApiKey("expensify-CognitoUserPoolAuthorizer", key);
                }
            });
        })
    }

    render() {
        return (
            <div id="swaggerContainer" />
        );
    }
}

Swagger.propTypes = {
    url: PropTypes.string,
    spec: PropTypes.string
};

export default Swagger;