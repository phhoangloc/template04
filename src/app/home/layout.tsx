import { Route } from 'next'
import { Metadata } from 'next'
import React from 'react'
import '../../style/home.css'
export const metadata: Metadata = {
    title: {
        template: '%s | Lockand',
        default: 'Lockand',
    },
}
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return children

}

export default Layout