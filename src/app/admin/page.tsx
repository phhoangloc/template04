'use client'
import LayoutRow from '@/component/layout/layoutRow'
import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import NaviProfile from '@/component/asset/naviProfile'
import Button from '@/component/input/button'
import { useRouter } from 'next/navigation'
const page = () => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    return (
        <h1>Admin</h1>
    )
}

export default page