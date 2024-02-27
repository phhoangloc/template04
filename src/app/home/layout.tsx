import { Route } from 'next'
import React from 'react'
import '../../style/home.css'
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className='home'>
            {children}
        </div>
    )
}

export default Layout