'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import { useRouter } from 'next/navigation'
import Login from '@/component/login'
type Props = {}

const Dashboard = (props: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const toPage = useRouter()
    useEffect(() => {
        if (currentUser.position === "admin") {
            toPage.push('/admin/dashboard')
        }
    }, [])

    return (
        <div className={`main center ${currentMenu ? "main_while_menu_open" : ""}`}><Login /></div>
    )

}

export default Dashboard