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
useEffect
type Props = {
    children: React.ReactNode,
    naviLeft: React.ReactNode,
    naviLeftWitdh: string
}

const LayoutRow = ({ children, naviLeft, naviLeftWitdh }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    useEffect(() => {
        update()
    })

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    return (
        <div className='overflow-hidden border-radius-5' style={{ margin: "0px", height: "calc(100vh - 10px)" }}>
            <div className='display-flex height-100p position-relative width-max-content' >
                <div className={"navi-left transition-all-05s height-100p overflow-hidden"} style={modalOpen ? { width: naviLeftWitdh } : { width: "0px" }}>
                    {naviLeft}
                </div>
                <div className={`${currentTheme ? "light1" : "dark1"} navi-right transition-all-05s border-radius-5 box-shadow-0`} style={{ height: "calc(100% - 10px)", margin: "5px", width: modalOpen ? window.innerWidth >= 992 ? `calc(100vw  - ${naviLeftWitdh} - 20px)` : "calc(100vw - 20px)" : "calc(100vw - 20px)" }} >
                    <div style={{ height: "40px", display: "flex" }}>
                        <IconToggle
                            icon1={<MenuOpenIcon onClick={() => setModalOpen(false)} style={{ width: "30px", height: "30px" }} />}
                            icon2={<MenuIcon onClick={() => setModalOpen(true)} style={{ width: "30px", height: "30px" }} />}
                            value={modalOpen} style={{ width: "40px", height: "40px", padding: "5px" }} />
                        <input placeholder='google' onChange={(e) => setSearch(e.target.value)} style={{ width: "200px", height: "30px", margin: "auto 5px", borderRadius: "5px" }} />
                        <Link href={`https://www.google.com/search?q=${search}`} target='_blank'> <SearchIcon style={{ width: "30px", height: "30px", margin: "5px" }} /></Link>
                        <IconToggle
                            icon1={<DarkModeIcon onClick={() => store.dispatch(setTheme(false))} style={{ width: "30px", height: "30px" }} />}
                            icon2={<LightModeIcon onClick={() => store.dispatch(setTheme(true))} style={{ width: "30px", height: "30px" }} />}
                            value={currentTheme} style={{ width: "40px", height: "40px", padding: "5px", position: 'absolute', right: "10px" }} />
                    </div>
                    <div className='navi-right display-flex flex-direction-column justify-content-center' style={{ height: "calc(100% - 40px)" }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutRow