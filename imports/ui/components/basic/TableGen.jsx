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
            {wihtoutIDData[0]?Object.entries(wihtoutIDData[0]).sort((a,b)=>colSeq.indexOf(a[0]) - colSeq.indexOf(b[0])).map(([key, value],i)=>(
                <th key={i} className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400">{key}</th>
            )
            ):
            colSeq.map((elem,i)=><th key={i} className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400">{elem}</th>)
          }
            {
                action&&
                <th className="py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-400">Action</th>
            }
        </tr>
      </thead>
      <tbody>
      {wihtoutIDData.length>0?wihtoutIDData.map((elem,i)=>(
           <tr key={i} className="hover:bg-gray-200">
            {Object.entries(elem).sort((a,b)=>colSeq.indexOf(a[0]) - colSeq.indexOf(b[0])).map(([key, value],j)=>(
                <td key={j} className="py-4 px-6 border-b border-gray-400">{value}</td>
            )
            )}
            {
                action&&
                <td className="py-4 px-6 border-b border-gray-400">{action(data[i]["id"])}</td>
            }
         </tr>
      )):
      <tr className="hover:bg-gray-200">
        <td className="text-gray-400 text-center" colSpan={colSeq.length+(action==null?0:1)}>
            {"No data available"}
        </td>
      </tr>
          
    }
      </tbody>
    </table>
  </div>
</div>
  )
}
