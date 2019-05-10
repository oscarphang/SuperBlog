import React,{useState} from 'react'
import Posts from '../../../api/Posts';
import History from '../../../startup/History';
import PostList from './PostList';
import Alert from 'react-s-alert';
import PostDetail from './components/PostDetail';
import {RoutesMap} from '../../../startup/AppRoute';

import {
    Meteor
} from 'meteor/meteor';
import {
    withTracker
} from 'meteor/react-meteor-data';

function PostEdit({
    post={title:"",description:""}
}) {
    const [id,setId]=useState(post._id);
    const handleSubmit = (event) => {
        event.preventDefault();

        const fdata = new FormData(event.target);

        Posts.update(id,{
            $set: {
                title: fdata.get("title"),
                description: fdata.get("description"),
                author: {name:Meteor.user().profile.name,id:Meteor.userId()},
                createdAt:id?post.createdAt:new Date()
            }
        } , function (err) {
            if (!err) {
                msg(Alert.success, "Post updated.");
                History.push(RoutesMap.get(PostList));
            } else {
                console.log(err);
                msg(Alert.error, err.reason || "Post update failed.");
            }
        });
    };

    return (  
        <PostDetail handleSubmit={handleSubmit} post={post} actionLabel="Update" />
    )
}

export default withTracker(({
    match
}) => {
    const id = match.params.id;

    return {
        post: Posts.findOne({
            _id: id
        }),
    };
})(PostEdit);