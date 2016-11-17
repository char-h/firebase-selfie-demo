import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { OpenCamera } from '../components/open-camera';

export const CameraApp = () => (
    <Jumbotron className="text-center">
        <p><OpenCamera /></p>
    </Jumbotron>
);
