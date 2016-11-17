import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { DataFromPresta } from '../components/prestashop-fetch-data';
// import { OpenCamera } from '../components/open-camera';

export const Index = () => (
    <Jumbotron className="text-center">
        <h2>98Starter</h2>
        <p>A starting point for Meteor-React applications.</p>
        <p><a className="btn btn-success" href="http://98labs.com/" role="button">Check our website!</a></p>
        <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v1.1.0</p>
        <DataFromPresta />
    </Jumbotron>
);
