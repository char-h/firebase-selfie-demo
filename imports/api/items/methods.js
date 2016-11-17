import { Items } from './items';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';


export const insertItem = new ValidatedMethod({
    name: 'items.insert',
    validate: new SimpleSchema({
        name: { type: String },
    }).validator(),
    run(item) {
        Items.insert(item);
    },
});


rateLimit({
    methods: [
        insertItem,
    ],
    limit: 5,
    timeRange: 1000,
});
