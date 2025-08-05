"use client"

import { SelectedStateProvider } from '@/components/page'
import { AgentList } from '@/features/page'
import React from 'react'

const AgentListPage = () => {
  return (
    <SelectedStateProvider>
    <AgentList/>
    </SelectedStateProvider>
  )
}

export default AgentListPage