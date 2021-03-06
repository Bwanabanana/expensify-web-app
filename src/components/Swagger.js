import React from 'react';
import PropTypes from 'prop-types';
import { Auth, API } from 'aws-amplify';
import SwaggerUI, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

class Swagger extends React.Component {

    componentDidMount() {

        Auth.currentSession().then((res) => {

            const cognitoToken = res.getIdToken();
            const key = cognitoToken.getJwtToken();

            const apiName = 'ExpensifyApi';
            const path = '/restapis/lxq8tf472d/stages/live/exports/oas30';
            const request = {
                headers: {
                    'Accept': 'application/json'
                },
                response: false
            };

            API.get(apiName, path, request).then(response => {

                const ui = SwaggerUI({
                    dom_id: '#swaggerContainer',
                    spec: response,
                    presets: [presets.apis],
                    onComplete: () => {
                        ui.preauthorizeApiKey("expensify-CognitoUserPoolAuthorizer", key);
                    }
                });

            }).catch(error => {
                console.log(error.response);
            });

        });
    }

    render() {
        return (
            <div id="swaggerContainer" />
        );
    }
}

Swagger.propTypes = {
    spec: PropTypes.object
};

export default Swagger;