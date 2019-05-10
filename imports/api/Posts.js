import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';

const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', ()=>Posts.find({}));
}

Posts.allow({
  insert: () => Roles.userIsInRole(Meteor.userId(), 'admins','.'),
  update: () => Roles.userIsInRole(Meteor.userId(), 'admins','.'),
  remove: () => Roles.userIsInRole(Meteor.userId(), 'admins','.'),
});


const CollectionSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Post title.',
  },
  description: {
    type: String,
    label: 'Post description.',
  },
  createdAt: {
    type: Date
  },
  author: {
    type: Object,
    label: 'Author (name and id) of the post.',
  },
  "author.name": {
    type: String,
    label: 'Author (name and id) of the post.',
  },
  "author.id": {
    type: String,
    label: 'Author (name and id) of the post.',
  }
});

Posts.attachSchema(CollectionSchema);

export default Posts;