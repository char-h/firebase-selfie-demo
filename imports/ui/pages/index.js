import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { DataFromPresta } from '../components/prestashop-fetch-data';
import * as firebase from 'firebase';
// import { OpenCamera } from '../components/open-camera';
var config = {
	apiKey: "AIzaSyDUno8-HYsNrZ1EPy-dJFJ2WjspCd0MJ4A",
    authDomain: "fir-selfie-demo.firebaseapp.com",
    databaseURL: "https://fir-selfie-demo.firebaseio.com",
    storageBucket: "fir-selfie-demo.appspot.com",
    messagingSenderId: "869302799165"
};

firebase.initializeApp(config);

export const Index = () => (
    <Jumbotron className="text-center">
        <h2>98Starter</h2>
        <p>A starting point for Meteor-React applications.</p>
        <p><a className="btn btn-success" href="http://98labs.com/" role="button">Check our website!</a></p>
        <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v1.1.0</p>
        <DataFromPresta />
    </Jumbotron>
);
