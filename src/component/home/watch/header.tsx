'use client'
import React from 'react'
import { useState } from 'react'
import store from '@/redux/store'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import Icon from '@/component/asset/icon'
import Image from 'next/image'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setTheme } from '@/redux/reducer/ThemeReduce'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { setMenu } from '@/redux/reducer/MenuReduce'
const Header = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
    }

    update()

    return (
        <div className={`watch_header ${currentTheme ? "light" : "dark"}`}>
            <div className="headerbox">
                <h1>Locand Watch</h1>
                <div className="header_tool">
                    {currentTheme ?
                        <Icon icon={<DarkModeIcon />} onClick={() => store.dispatch(setTheme(false))} size={30} /> :
                        <Icon icon={<LightModeIcon />} onClick={() => store.dispatch(setTheme(true))} size={30} />
                    }
                    <Icon icon={<ShoppingCartIcon />} onClick={() => store.dispatch(setMenu(true))} />
                </div>
            </div>
        </div>
    )
}

export default Header