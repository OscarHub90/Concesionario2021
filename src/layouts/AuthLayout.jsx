import React from 'react'

const AuthLayout = ({children}) => {
    return (
        <div className="flex flex-col items-center justify-center py-3 px-3">
            Layout Autenticación
            <div className="w-full flex">
            {children}
            </div>
        </div>
    )
}

export default AuthLayout
