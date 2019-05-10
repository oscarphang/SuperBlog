import React from 'react'
import AdminContainer from '../../layouts/AdminContainer';
import TableGen from '../../components/basic/TableGen';
import SimpleButton from '../../components/basic/SimpleButton';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../../startup/AppRoute';
import Posts from '../../../api/Posts';
import PostEdit from './PostEdit';
import PostNew from './PostNew';
import History from '../../../startup/History';
import msg from '../../../utils/msg';
import Alert from 'react-s-alert';

function PostList({posts}) {
    const tableData = posts.map(elem=>({"id":elem._id,"Title":elem.title,"Created Date":moment(elem.createdAt).format("L"),"Author":elem.author.name}));
    const confirmDelete = id =>{
      if(window.confirm('Delete the item?')){
        Posts.remove({_id:id},err=>{
          if (!err) {
              msg(Alert.success, "Post deleted.");
              History.push(RoutesMap.get(PostList));
          } else {
              console.log(err);
              msg(Alert.error, err.reason || "Post delete failed.");
          }
        })
      }
    }
    const actionButton = id =>(<>
    {/* <Link to={`${RoutesMap.get(PostEdit).replace(":id","")}${id}`} className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded h-16"><i className="far fa-edit"></i></Link> */}
    <SimpleButton label={<i className="far fa-edit"/>} whiteText bgColor="blue" extraClass="h-10" onClick={()=>History.push(`${RoutesMap.get(PostEdit).replace(":id","")}${id}`)}/>
    <SimpleButton label={<i className="far fa-trash-alt"/>} whiteText bgColor="red" extraClass="h-10" onClick={()=>confirmDelete(id)}/>
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