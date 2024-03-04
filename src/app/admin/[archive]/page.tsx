'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import Login from '@/component/login'
import NotFound from '@/app/not-found'
import ItemAchive from '@/component/admin/main/archive'
import { setNotice } from '@/redux/reducer/noticeReducer'
import ArchivePicture from '@/component/admin/main/archivePicture'
import ArchiveTest from '@/component/admin/main/archiveTest'
type Props = {
    params: { archive: string }
}

const Archive = ({ params }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))

    }

    update()

    if (currentUser.position === "admin") {
        switch (params.archive) {
            case "watch":
            case "user":
                return <ItemAchive archive={params.archive} />
            case "picture":
                return <ArchivePicture />
            case "dashboard":
            case "profile":
                return (
                    <div className={`main center ${currentMenu ? "main_while_menu_open" : ""}`}>{params.archive}</div>
                )
            case "test":
                return <ArchiveTest />
        }

    }

    return (
        <div className={`main center ${currentMenu ? "main_while_menu_open" : ""}`}><NotFound /></div>
    )
}

export default Archive