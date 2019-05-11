import React from 'react'
import AppContainer from '../../layouts/AppContainer';
import BlogPost from './components/BlogPost';
import { withTracker } from 'meteor/react-meteor-data';
import Posts from '../../../api/Posts';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../../startup/AppRoute';
import BlogRead from './BlogRead';

function BlogHome({posts}) {
  return (
    <AppContainer>
        <div className="w-2/3 mx-auto">
        
        {
            posts.map((elem,i)=><Link key={i} to={`${RoutesMap.get(BlogRead).replace(":id","")}${elem._id}`}><BlogPost title={elem.title} description={elem.description} postDate={elem.createdAt} author={elem.author} imgUrl={elem.imgUrl} /></Link>)
        }
        </div>
    </AppContainer>
    
  )
}

export default withTracker(() => {
    
    Meteor.subscribe('posts');
    return {
        posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
  })(BlogHome);
  