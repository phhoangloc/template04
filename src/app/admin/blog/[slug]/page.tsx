import ItemEdit from '@/component/display/ItemEdit'
import React from 'react'

type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {
    return <ItemEdit archive='blog' slug={params.slug} />
}

export default Page