import Header from '@/component/home/watch/header'
import React from 'react'
import { Metadata } from 'next'
import CartModal from '@/component/home/watch/cartModal'
export const metadata: Metadata = {
    title: {
        template: '%s | Watch',
        default: 'Watch',
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
                <CartModal />
                {children}
            </div>
        </div>
    )
}

export default layout