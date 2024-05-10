import Login from '@/component/auth/login'
import React from 'react'


const page = () => {
    return (
        <div style={{ height: "calc(100vh - 10px)", padding: "5px" }}>
            <Login archive='' />
        </div>
    )
}

export default page