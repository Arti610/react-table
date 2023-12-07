import React from 'react'
import './App.css'
import { BasicTable } from './components/BasicTable'
import { SortingTable } from './components/SortingTable'
import { PaginationTable } from './components/PaginationTable'

function App() {
  return (
    <div className='App'>
      <BasicTable />
    </div>
  )
}

export default App