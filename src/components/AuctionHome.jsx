import CreatAuctions from './CreateAuctions'

import React from 'react'

const AuctionHome = ({searchTerm}) => {
  return (
    <div>
   <CreatAuctions searchTerm= {searchTerm} />
   </div>
  )
}

export default AuctionHome;