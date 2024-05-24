'use client'
import React, { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import store from '@/redux/store';
type Props = {
    title: string
    data: any[]
    width: string
}

const Accordion = ({ title, data, width }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    const [open, setOpen] = useState<boolean>(false)
    return (
        <div style={{ width: width }}>
            <div className='grid_box' style={{ height: "40px", lineHeight: "40px" }}>
                <p style={{ width: `calc(${width} - 40px)` }}>{title}</p>
                {open ?
                    <KeyboardArrowUpIcon style={{ width: "30px", height: "30px", padding: "5px" }} onClick={() => setOpen(false)} />
                    : <KeyboardArrowDownIcon style={{ width: "30px", height: "30px", padding: "5px" }} onClick={() => setOpen(true)} />}
            </div>
            <div className='transition-all-05s overflow-hidden' style={{ height: `${open ? data.length * 35 + "px" : 0}` }}>
                {
                    data ? data.map((item: any, index: number) =>
                        item.link ?
                            <Link href={item.link} key={index}>
                                <div className='hover-title' key={index}
                                    style={{ height: "30px", lineHeight: "30px", fontSize: "0.9rem", padding: "0 5px", cursor: "pointer", opacity: 0.75, borderRadius: "5px" }}>
                                    {item.name}</div></Link> :
                            <div className='hover-title' key={index}
                                style={{ height: "30px", lineHeight: "30px", fontSize: "0.9rem", padding: "0 5px", cursor: "pointer", opacity: 0.75, borderRadius: "5px" }}>
                                {item.name}</div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Accordion