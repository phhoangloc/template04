'use client'
import Login from '@/component/login'
import React, { useState } from 'react'
import store from '@/redux/store'

type Props = {}

const Page = (props: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)


    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))

    }

    update()
    return <div className={`main center ${currentMenu ? "main_while_menu_open" : ""}`}><Login /></div>

}

export default Page