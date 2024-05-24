'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import IconToggle from '../tool/iconToggle'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import store from '@/redux/store';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import { Accordion } from '@mui/material';
import AccordionIcon from '../tool/accordionIcon';
import Image from 'next/image';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import NotFound from '@/app/not-found';
useEffect
type Props = {
    children: React.ReactNode,
    naviLeft: React.ReactNode,
    naviLeftWitdh: string,
    onSearch?: () => void
}

const LayoutRow = ({ children, naviLeft, naviLeftWitdh, onSearch }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    const toPage = useRouter()
    return (
        <div className='overflow-hidden border-radius-5' style={{ margin: "0px", minHeight: "calc(100vh - 10px)" }}>
            <div className='display-flex height-100p position-relative width-max-content'>
                <div className={"navi-left transition-all-05s height-100p overflow-hidden"} style={modalOpen ? { width: naviLeftWitdh } : { width: "0px" }}>
                    {naviLeft}
                </div>
                <div className={`navi-right transition-all-05s scrollbar-5px`} style={{ overflow: "hidden", minHeight: "calc(100vh - 10px)", margin: "0 5px", width: modalOpen ? window.innerWidth >= 992 ? `calc(100vw  - ${naviLeftWitdh} - 20px)` : "calc(100vw - 20px)" : "calc(100vw - 20px)" }} >
                    <div style={{ height: "40px", margin: "5px", display: "flex" }}>
                        <IconToggle
                            icon1={<MenuOpenIcon onClick={() => setModalOpen(false)} style={{ width: "30px", height: "30px" }} />}
                            icon2={<MenuIcon onClick={() => setModalOpen(true)} style={{ width: "30px", height: "30px" }} />}
                            value={modalOpen} style={{ width: "40px", height: "40px", padding: "5px" }} />
                        <input placeholder='search google' onChange={(e) => setSearch(e.target.value)} style={{ width: "200px", height: "30px", margin: "auto 5px", border: "none", fontSize: "15px", borderRadius: "15px", padding: "0 15px" }} />
                        <SearchIcon onClick={() => onSearch ? onSearch() : toPage.push(`https://www.google.com/search?q=${search}`)} style={{ width: "30px", height: "30px", margin: "5px" }} />
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
                                top="10px"
                                right='50px' /> :
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
                                top="10px"
                                right='50px' />
                        }
                        <IconToggle
                            icon1={<DarkModeIcon onClick={() => store.dispatch(setTheme(false))} style={{ width: "30px", height: "30px" }} />}
                            icon2={<LightModeIcon onClick={() => store.dispatch(setTheme(true))} style={{ width: "30px", height: "30px" }} />}
                            value={currentTheme} style={{ width: "40px", height: "40px", padding: "5px", position: 'absolute', right: "10px" }} />
                    </div>
                    <div style={{ position: "relative", minHeight: "calc(100% - 50px)", margin: "0 5px" }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutRow