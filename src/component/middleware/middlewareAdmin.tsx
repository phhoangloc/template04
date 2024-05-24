'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import NotFound from '@/app/not-found'
type Props = {
    children: React.ReactNode
}

const MiddlewareAdmin = ({ children }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    if (currentUser?.position === "admin") {
        return children
    } else {
        return (
            <NotFound />
        )
    }
}

export default MiddlewareAdmin