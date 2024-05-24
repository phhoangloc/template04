import React from 'react'

export function generateStaticParams() {
    return [{ slug: '663b1906f05c745cc0926a7a' }]
}

type Props = {
    children: React.ReactNode
    params: { slug: string }
}

const layout = ({ children, params }: Props) => {
    return (
        <div>{children}</div>
    )
}

export default layout