
import React from 'react'

type Props = {
    params: { slug: string }
}
const Page = ({ params }: Props) => {
    return (
        <div>id:{params.slug}</div>
    )
}

export default Page