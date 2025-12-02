import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/subscriptionSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const UpgradePlanButton = () => {
    const dispatch=useDispatch()
    
  const handleUpgrade = () => {

dispatch(openModal())
  };
 const isProServiceProvider=useSelector((state:RootState)=>state.serviceProvider.isProServiceProvider)


  if(isProServiceProvider){
    return<> </>
  }
  return (
     <button 
                  onClick={handleUpgrade}
                  className="w-full btn btn-accent text-accent-content btn-sm sm:w-auto"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Upgrade Plan
                </button>
  )
}

export default UpgradePlanButton
