import React from 'react'
import Header from '@/component/display/header'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className="home" style={{ maxWidth: "1600px", overflow: "hidden", margin: "auto" }}>
            <Header />
            {children}
        </div>
    )
}

export default layout