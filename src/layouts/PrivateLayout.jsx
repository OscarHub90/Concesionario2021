import Sidebar from 'components/Sidebar'
import React from 'react'
import { Children } from 'react'

const PrivateLayout = ({Children}) => {
    return (
        <div>
            <Sidebar />
            {Children}
        </div>
    )
}

export default PrivateLayout
