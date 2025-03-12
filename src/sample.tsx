import { getRequest } from "./utils/makeRequestInstance"


const sample = () => {
  return (
    <div>
      <button onClick={()=>getRequest("http://localhost:5001/service-providers/r")}>click
      </button>
    </div>
  )
}

export default sample
