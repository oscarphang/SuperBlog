import React from 'react'
import AppContainer from '../../layouts/AppContainer';
import BlogPost from './components/BlogPost';
import { withTracker } from 'meteor/react-meteor-data';
import Posts from '../../../api/Posts';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../../startup/AppRoute';
import BlogRead from './BlogRead';
import LoadingSpinner from '../../components/basic/LoadingSpinner';

function BlogHome({posts,isLoading}) {
  return (
    <AppContainer>
        <div className="w-2/3 mx-auto animate-content">
        
        {
            isLoading?<LoadingSpinner isLoading/> :posts.map((elem,i)=><Link key={i} to={`${RoutesMap.get(BlogRead).replace(":id","")}${elem._id}`}><BlogPost title={elem.title} description={elem.description} postDate={elem.createdAt} author={elem.author} imgUrl={elem.imgUrl} /></Link>)
        }
        </div>
    </AppContainer>
    
  )
}

export default withTracker(() => {
    
    const {ready} = Meteor.subscribe('posts');
    return {
        posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
        isLoading: !ready()
    };
  })(BlogHome);
  