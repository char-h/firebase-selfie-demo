import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';


export const Item = ({ item }) => (
    <ListGroupItem key={ item._id }>
        <Row>
            <Col xs={ 8 } sm={ 10 }>
                <FormControl
                    type="text"
                    standalone
                    defaultValue={ item.name }

                    />
            </Col>
            <Col xs={ 4 } sm={ 2 }>

            </Col>
        </Row>
    </ListGroupItem>
);
