import React, { useState } from "react"
interface IFileUploadProp{
    upladFile?:()=>void,

}


const ChatImageUploadModal :React.FC<IFileUploadProp> = ({}) => {
    const [uploadFiles,setuploadFiles]=useState<boolean>(false)
  return (
    <div>
      <div >

      </div>

    </div>
  )
}

export default ChatImageUploadModal
