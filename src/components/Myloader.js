import React from "react"
import ContentLoader from "react-content-loader" 

const MyLoader = () => (
 <ContentLoader 
    speed={2}
    width={500}
    height={100}
    viewBox="0 0 500 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="100" rx="3" ry="3" width="100%" height="7" /> 
    <rect x="0" y="70" rx="3" ry="3" width="475" height="7" /> 
    <rect x="-2" y="85" rx="3" ry="3" width="479" height="7" /> 

  </ContentLoader>
)

export default MyLoader
