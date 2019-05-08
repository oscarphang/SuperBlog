import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const CollectionSchema = new SimpleSchema({
  startDate: {
    type: Date,
    label: 'When the leave start.',
  },
  endDate: {
    type: Date,
    label: 'When the leave end.',
  },
  appliedBy: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  remark: {
    type: String,
    label: 'Description about the leave.',
  },
  approvedBy: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    label: 'show the leave is approved',
    optional: true,
  }
});

Posts.attachSchema(CollectionSchema);

export default Posts;