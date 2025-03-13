import { getRequest } from "./utils/makeRequestInstance"
import {adminGetRequest} from './utils/AxiosAdmin'

const sample = () => {
  return (
    <div>
      <button onClick={()=>adminGetRequest("http://localhost:5001/admin/r")}>click
      </button>
    </div>
  )
}

export default sample
