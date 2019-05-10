import React from 'react'
import {RoutesMap} from '../../../startup/AppRoute';
import History from '../../../startup/History';
import msg from '../../../utils/msg';
import Alert from 'react-s-alert';
import PostDetail from './components/PostDetail';
import Posts from '../../../api/Posts';
import PostList from './PostList';

export default function PostNew() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const fdata = new FormData(event.target);

        Posts.insert({
            title: fdata.get("title"),
            description: fdata.get("description"),
            imgUrl: fdata.get("image-url"),
            author: {name:Meteor.user().profile.name,id:Meteor.userId()},
            createdAt:new Date()
        },function (err) {
            if (!err) {
                msg(Alert.success, "Post inserted.");
                History.push(RoutesMap.get(PostList));
            } else {
                console.log(err);
                msg(Alert.error, err.reason || "Post insert failed.");
            }
        });
    };

  return (
    <PostDetail handleSubmit={handleSubmit} actionLabel="Create" />
  )
}
