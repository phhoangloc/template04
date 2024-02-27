'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import Signup from '@/component/signup'

const Page = () => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)


    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))

    }

    update()
    return <div className={`main center ${currentMenu ? "main_while_menu_open" : ""}`}><Signup /></div>

}

export default Page