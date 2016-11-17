import { composeWithTracker } from 'react-komposer';
import { Items } from '../../api/items/items';
import { ItemsList } from '../components/items-list';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
    const subscription = Meteor.subscribe('items');
    if (subscription.ready()) {
        const items = Items.find().fetch();
        onData(null, { items });
    }
};

export default composeWithTracker(composer, Loading)(ItemsList);
