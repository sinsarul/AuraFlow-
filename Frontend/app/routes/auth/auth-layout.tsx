import React from 'react'
import { Outlet } from 'react-router'

function authLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default authLayout