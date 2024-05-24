import MiddlewareAdmin from '@/component/middleware/middlewareAdmin'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div>
            <MiddlewareAdmin>
                {children}
            </MiddlewareAdmin>
        </div>
    )
}

export default layout
