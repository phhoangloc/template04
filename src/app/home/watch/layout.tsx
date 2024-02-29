import Header from '@/component/home/watch/header'
import React from 'react'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: {
        template: '%s | Watch',
        default: 'Watch', // a default is required when creating a template
    },
}

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className='home'>
            <div className=' watch'>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default layout