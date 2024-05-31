'use client'
import { NoUserAuthen } from '@/api/NoUserAuthen'
import Parallax from '@/component/display/parallax'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {

    const [data, setData] = useState<[]>([])
    const getData = async (a: string, s: number | undefined, l: number | undefined) => {
        const result = await NoUserAuthen.getItem(a, s, l)
        setData(result.data)
    }

    useEffect(() => {
        getData("blog", undefined, undefined)
    }, [])
    return (
        <Parallax data={data} />
    )
}

export default Page