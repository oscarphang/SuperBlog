import React from 'react'
import BlogHome from './BlogHome';
import { withTracker } from 'meteor/react-meteor-data';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../../startup/AppRoute';
import Posts from '../../../api/Posts';
import AppContainer from '../../layouts/AppContainer';
import { Redirect } from 'react-router';
import Login from '../auth/Login';

export default function BlogRead({match}) {
  const post = Posts.findOne({
      _id: match.params.id
  });
  if (!post){
    return <Redirect to={RoutesMap.get(Login)}/>
  }

  return (
    <AppContainer>
      <div className="container w-full md:max-w-5xl mx-auto pt-20 animate-content">
          
          <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal text-left" style={{fontFamily:"Georgia,serif"}}>
        
          <div className="font-sans">
            <span className="text-base md:text-sm text-teal-500 font-bold">{"<"}</span> 
            <Link to={RoutesMap.get(BlogHome)} className="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline">BACK TO BLOG</Link>
            <h1 className="text-xl font-semibold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{post.title}</h1>
            <p className="text-sm md:text-base font-normal text-gray-600"><i className="far fa-clock mr-2"></i>{moment(post.createdAt).fromNow()}</p>
          </div>

            <p className="py-6 whitespace-pre-wrap">
              {post.description}
            </p>

          <hr className="border-b-2 border-gray-400 mb-8 mx-4"/>
          
          <div className="flex w-full items-center font-sans px-4 py-12">
            <i className="fas fa-user-circle"></i>
            <div className="flex-1 px-2">
              <p className="text-base font-bold text-base md:text-xl leading-none mb-2">{post.author.name}</p>
            </div>
            <div className="justify-end">
              {/* <button className="bg-transparent border border-gray-500 hover:border-teal text-xs text-gray-500 hover:text-teal font-bold py-2 px-4 rounded-full">Read More</button> */}
            </div>
          </div>

          </div> 
        </div>
    </AppContainer>
   
  )
}

