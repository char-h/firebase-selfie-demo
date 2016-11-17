import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemsList from '../containers/items-list.js';
import { AddItem } from '../components/add-item';

export const Items = () => (
    <Row>
        <Col xs={ 12 }>
            <h4 className="page-header">Items</h4>
            <AddItem />
            <ItemsList />
        </Col>
    </Row>
);
