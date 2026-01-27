import React from 'react'

interface ErrorAlertProps {
    isError:boolean |string 
}

const ErrorAlert: React.FC< ErrorAlertProps > =  ({isError}) => {
  return (
    <div>
      {isError && <div role="alert" className="alert alert-info p-2 opacity-80 text-primary-content">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="h-6 w-6 shrink-0 stroke-current">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span >{isError}</span>
    </div>}
    </div>
  )
}

export default ErrorAlert
