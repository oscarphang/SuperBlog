import React from 'react'

export default function TableGen({data,colSeq,action=null}) {
  const wihtoutIDData = data.map(elem=>{
    const obj = Object.assign({}, elem)
    delete obj["id"];
    return obj;
  });

  return (
    <div className="w-2/3 mx-auto">
  <div className="bg-white shadow-md rounded my-6">
    <table className="text-left w-full border-collapse">
      <thead>
        <tr>
            {Object.entries(wihtoutIDData[0]).sort((a,b)=>colSeq.indexOf(a[0]) - colSeq.indexOf(b[0])).map(([key, value],i)=>(
                <th key={i} className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">{key}</th>
            )
            )}
            {
                action&&
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Action</th>
            }
        </tr>
      </thead>
      <tbody>
      {wihtoutIDData.map((elem,i)=>(
           <tr key={i} className="hover:bg-grey-lighter">
            {Object.entries(elem).sort((a,b)=>colSeq.indexOf(a[0]) - colSeq.indexOf(b[0])).map(([key, value],j)=>(
                <td key={j} className="py-4 px-6 border-b border-grey-light">{value}</td>
            )
            )}
            {
                action&&
                <td className="py-4 px-6 border-b border-grey-light">{action(data[i]["id"])}</td>
            }
         </tr>
      ))}
      </tbody>
    </table>
  </div>
</div>
  )
}