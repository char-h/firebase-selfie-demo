import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Item } from './item.js';

export const ItemsList = ({ items }) => (
    items.length > 0 ? <ListGroup >
        {items.map((itm) => (
            <Item key={ itm._id } item={ itm } />
        ))}
    </ListGroup> :
        <Alert bsStyle="warning">No items yet.</Alert>
);

ItemsList.propTypes = {
    items: React.PropTypes.array,
};
