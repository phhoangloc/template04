import NaviProfile from '@/component/asset/naviProfile'
import LayoutRow from '@/component/layout/layoutRow'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <LayoutRow
            naviLef={
                <NaviProfile />
            }
            naviLeftWitdh='200px'>
            {children}
        </LayoutRow>
    )
}

export default layout