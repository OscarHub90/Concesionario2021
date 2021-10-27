import React from 'react'
import Sidebar from 'components/Sidebar'

const PrivateLayout = ({children}) => {
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <main className="flex w-full bg-blue-200 overflow-y-scroll">{children}</main>
            
        </div>
    )
}

export default PrivateLayout
