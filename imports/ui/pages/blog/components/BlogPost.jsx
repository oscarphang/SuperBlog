import React from 'react'

export default function BlogPost({imgUrl="",title,description,author,postDate}) {
  return (
    <div className="max-w-md w-full lg:flex text-left mb-4 shadow-md">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage:`url('${imgUrl}')`}} title={title}>
        </div>
        <div className="w-full border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
            <p className="text-sm text-grey-dark flex items-center">
                <svg className="fill-current text-grey w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                Members only
            </p>
            <div className="text-black font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">{description.substring(0, 70)}{description.length>70?"...":""}</p>
            </div>
            <div className="flex items-center">
            
            <div className="text-sm">
            
                <p className="text-black leading-none "><i className="fas fa-user-circle"></i>{author.name}</p>
                <p className="text-grey-dark">{moment(postDate).format('LL')}</p>
            </div>
            </div>
        </div>
        </div>
  )
}
