import { Meteor } from 'meteor/meteor';
import { Items } from '../items';

Meteor.publish('items', () => Items.find());
