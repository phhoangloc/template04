
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import UserEdit from '@/component/display/userEdit'
type Props = {
    params: { id: string }
}
const Page = ({ params }: Props) => {

    return <UserEdit id={params.id} />
}

export default Page