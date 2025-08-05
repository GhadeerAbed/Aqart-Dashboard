
import { Status } from '@/features/myPropertyList/data/page'
import PropList from '@/features/myPropertyList/page'
import React from 'react'

const MyPropertyStatusPage = () => {
  return (

    <PropList propStatus={true} types={Status} defaultState="Pending"/>
  )
}

export default MyPropertyStatusPage