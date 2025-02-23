import SkeletonHome from "../Skeleton/SkeletonHome"
import SignInSingUp from "./AuthModel/SignInSingUp"

const Home = () => {
    
    const data=null
     return (
    <div className="p-5 pl-12 align-content: center;" >
  {data?<></> :    <div className="flex flex-row flex-wrap">
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
<SkeletonHome/>
    </div>}
<SignInSingUp/>

    </div>
  )
}

export default Home
