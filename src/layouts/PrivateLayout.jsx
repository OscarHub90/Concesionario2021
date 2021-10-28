import React from 'react'
import Sidebar from 'components/Sidebar'

const PrivateLayout = ({children}) => {
    return (
        <div className="flex w-screen h-screen">
            <Sidebar />
            <main className="flex w-full overflow-y-scroll justify-center items-center">{children}</main>
            
        </div>
    )
}

export default PrivateLayout
