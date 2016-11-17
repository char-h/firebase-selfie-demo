//import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Items = new Mongo.Collection('Items');

Items.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Items.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Items.schema = new SimpleSchema({
    name: {
        type: String,
        label: 'name of the item.',
    },
});

Items.attachSchema(Items.schema);

//Factory.define('item', Items, {
//    title: () => faker.hacker.phrase(),
//});
