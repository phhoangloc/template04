import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
type Props = {
    title: string
    data: any[]
    width: string
}

const Accordion = ({ title, data, width }: Props) => {

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
                        <div className='hover-title' key={index}
                            style={{ height: "30px", lineHeight: "30px", fontSize: "0.9rem", padding: "0 5px", cursor: "pointer", opacity: 0.75, borderRadius: "5px" }}>
                            {item.link ? item.target ? <Link target='_blank' href={item.link} >{item.name}</Link> : <Link href={item.link} >{item.name}</Link> : item.name}
                        </div>) : null
                }
            </div>
        </div>
    )
}

export default Accordion