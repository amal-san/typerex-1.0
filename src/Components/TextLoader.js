import React from "react"
import ContentLoader from "react-content-loader" 

const TextLoader = () => (
 <ContentLoader 
    speed={3}
    width={1500}
    height={100}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="5" ry="2" width="1300" height="8" />
    <rect x="10" y="30" rx="5" ry="2" width="1300" height="8" />
    <rect x="10" y="50" rx="5" ry="2" width="1300" height="8" />
    <rect x="10" y="70" rx="5" ry="2" width="1300" height="8" />
    <rect x="10" y="90" rx="5" ry="2" width="1300" height="8" />
  </ContentLoader>
)

export default TextLoader
