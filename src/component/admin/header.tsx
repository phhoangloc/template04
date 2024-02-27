'use client'

import React from 'react'
import { useState } from 'react'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import store from '@/redux/store'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setTheme } from '@/redux/reducer/ThemeReduce'
import MenuIcon from '@mui/icons-material/Menu';
import { setMenu } from '@/redux/reducer/MenuReduce'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Image from 'next/image'
import ProfileNarbar from './profileNarbar'
import Icon from '../asset/icon'
type Props = {}

const Header = (props: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const [profileOpen, setProfileOpen] = useState<boolean>(false)

    return (
        <div className={`header ${currentTheme ? "light" : "dark"}`}>
            <div className="headerbox">
                {currentMenu ?
                    <Icon
                        icon={<MenuOpenIcon />}
                        onClick={() => store.dispatch(setMenu(!store.getState().menu))}
                        size={30} /> :
                    <Icon
                        icon={<MenuIcon />}
                        onClick={() => store.dispatch(setMenu(!store.getState().menu))}
                        size={30} />}
                <h1>Admin</h1>
                <div className="header_tool">
                    {currentUser.avata ?
                        <Icon
                            icon={<Image src={process.env.google_url + currentUser?.avata?.name} width={30} height={30} alt='avata' />}
                            onClick={() => setProfileOpen(!profileOpen)}
                            size={30} /> :
                        null}
                    {currentTheme ?
                        <Icon icon={<DarkModeIcon />} onClick={() => store.dispatch(setTheme(false))} size={30} /> :
                        <Icon icon={<LightModeIcon />} onClick={() => store.dispatch(setTheme(true))} size={30} />
                    }
                </div>
            </div>
            <ProfileNarbar open={profileOpen} close={(e) => setProfileOpen(e)} />

        </div>
    )
}

export default Header