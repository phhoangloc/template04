import Header from '@/component/admin/header'
import Narbar from '@/component/admin/narbar'
import '../../style/admin.css'
import React from 'react'

export const metadata = {
    title: {
        template: '%s | Admin',
        default: 'Admin'
    },
}

type Props = {
    children: React.ReactNode,
}

const Layout = ({ children }: Props) => {
    return (
        <div className='admin'>
            <Header />
            <div className="body">
                <Narbar />
                {children}
            </div>
        </div>
    )
}

export default Layout