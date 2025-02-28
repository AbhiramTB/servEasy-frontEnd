import SkeletonHome from "../../Skeleton/SkeletonHome"
 import {Link} from "react-router-dom"
const Home = () => {
    
    const data=null
     return (
    <>
  {data?<> </>
   :   <Link to={'/signin'}> <div  className="mt-10 flex flex-row flex-wrap justify-center">
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
    </div> 
    </Link>}


    </>
  )
}

export default Home
