import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertItem } from '../../api/items/methods.js';

const handleInsertItem = (event) => {
    const target = event.target;
    const name = target.value.trim();

    if (name !== '' && event.keyCode === 13) {
        insertItem.call({
            name,
        }, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                target.value = '';
                Bert.alert('item added!', 'success');
            }
        });
    }
};

export const AddItem = () => (
    <FormGroup>
        <FormControl
            type="text"
            onKeyUp={ handleInsertItem }
            placeholder="Type a item  and press enter..."
            />
    </FormGroup>
);