import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', ()=>Posts.find({}));
}

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
  title: {
    type: String,
    label: 'Post title.',
  },
  endDate: {
    type: String,
    label: 'Post description.',
  },
  createdAt: {
    type: Date
  },
  author: {
    type: String,
    label: 'Author of the post.',
  }
});

Posts.attachSchema(CollectionSchema);

export default Posts;