import React from 'react'
import AdminContainer from '../../layouts/AdminContainer';
import TableGen from '../../components/basic/TableGen';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../../startup/AppRoute';
import Posts from '../../../api/Posts';
import PostEdit from './PostEdit';
import PostNew from './PostNew';

function PostList({posts}) {
    const tableData = posts.map(elem=>({"id":elem._id,"Title":elem.title,"Created Date":moment(elem.createdAt).format("L"),"Author":elem.author.name}));
    const actionButton = id =>(<>
    <Link to={`${RoutesMap.get(PostEdit).replace(":id","")}${id}`} className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">Edit</Link>
    </>);
  return (
    <AdminContainer>
        <div>
            <div className="w-2/3 mx-auto flex justify-end">
            <Link to={`${RoutesMap.get(PostNew)}`} className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">Create</Link>
            </div>
        <TableGen data={tableData} colSeq={["Title","Created Date","Author"]} action={actionButton}/>
        </div>
      
    </AdminContainer>
  )
}

export default withTracker(() => {
    Meteor.subscribe('posts');
    return {
        posts: Posts.find({}).fetch(),
    };
  })(PostList);