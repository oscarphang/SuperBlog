import React from 'react'
import TextBox from '../../../components/basic/TextBox';
import SubmitButton from '../../../components/basic/SubmitButton';
import AdminContainer from '../../../layouts/AdminContainer';

export default function PostDetail({
    post={title:"",description:""},
    handleSubmit=undefined,
    actionLabel
}) {
    return (  
    <AdminContainer>
        <form onSubmit={handleSubmit} >
        
        <div className=" flex justify-center">
        <div className="w-2/3">
          <div className="mb-4 text-left">
            <TextBox label={`Title`} value={post.title} name="title" />
          </div>
          <div className="mb-4 text-left">
            <TextBox label="Description" name="description" value={post.description} type="multiline" extraClass="h-32"/>
          </div>
          <div className="mb-4 text-left flex justify-end">
            <div>
            <SubmitButton label={actionLabel} />
            </div>
          </div>
        </div>
        </div>
        </form>
          </AdminContainer>

    )
}