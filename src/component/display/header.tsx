'use client'
import React from 'react'
import AccordionIcon from '../tool/accordionIcon'
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';
import store from '@/redux/store';
import Image from 'next/image';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconToggle from '../tool/iconToggle';
import { setMenu } from '@/redux/reducer/MenuReduce';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setTheme } from '@/redux/reducer/ThemeReduce';
type Props = {

}

const Header = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))

    }
    useEffect(() => {
        update()
    })

    return (
        <div style={{ height: "40px", lineHeight: "40px" }}>
            <div className='display-flex position-relative' style={{ maxWidth: "992px", margin: "auto" }}>
                <IconToggle
                    icon1={<DarkModeIcon onClick={() => store.dispatch(setTheme(false))} style={{ width: "30px", height: "30px" }} />}
                    icon2={<LightModeIcon onClick={() => store.dispatch(setTheme(true))} style={{ width: "30px", height: "30px" }} />}
                    value={currentTheme} style={{ width: "40px", height: "40px", padding: "5px", position: 'absolute', right: "10px" }} />
                {currentUser?._id ? <NotificationsIcon style={{ position: "absolute", right: "50px", top: "5px", height: "30px", width: "30px" }} /> : null}
                {currentUser?._id ?
                    <AccordionIcon
                        icon={currentUser?.avata?.name ? <Image src={process.env.ftp_url + currentUser?.avata?.name} width={100} height={100} alt='avt' style={{ width: "30px", height: "30px" }} /> : null}
                        data={[
                            {
                                name: "Profile",
                                link: "/profile"
                            },
                            {
                                name: "Log Out",
                                func: () => { store.dispatch(setRefresh()), localStorage.clear() }
                            }
                        ]}
                        top="5px"
                        right='90px' /> :
                    <AccordionIcon
                        icon={<PersonIcon style={{ width: "30px", height: "30px" }} />}
                        data={[
                            {
                                name: "Log In",
                                link: "/login"
                            },
                            {
                                name: "Sign Up",
                                link: "/signup"
                            }
                        ]}
                        top="5px"
                        right='90px' />
                }
                <h2>LocPham</h2>
            </div>
        </div>
    )
}

export default Header