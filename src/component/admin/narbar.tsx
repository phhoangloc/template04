'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import DashboardIcon from '@mui/icons-material/Dashboard';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PersonIcon from '@mui/icons-material/Person';
import store from '@/redux/store';
import { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
type Props = {}
const Narbar = (props: Props) => {


    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    const toPage = useRouter()

    const lists = [
        {
            icon: <DashboardIcon />,
            name: "dashboard",
            link: "dashboard"
        },
        {
            icon: <WatchLaterIcon />,
            name: "watch",
            link: "watch"
        },
        {
            icon: <PersonIcon />,
            name: "user",
            link: "user"
        },
        {
            icon: <InsertPhotoIcon />,
            name: "picture",
            link: "picture"
        },
    ]
    const [select, setSelect] = useState<number>(0)
    return (
        <div className={`narbar ${currentMenu ? "narbar_open" : ""}`}>
            {
                lists.map((item, index) =>
                    <div className={`item ${select === index ? "item_select" : ""}`} onClick={() => { toPage.push("/admin/" + item.link); setSelect(index) }} key={index}>
                        {item.icon}<span>{item.name.toLocaleUpperCase()}</span>
                    </div>)
            }
        </div>
    )
}

export default Narbar