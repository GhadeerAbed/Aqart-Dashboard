import { UpdateAgent } from '@/features/page'
import React from 'react'

const EditAgentPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
        <UpdateAgent rowId={id}/>
    </div>
  )
}

export default EditAgentPage