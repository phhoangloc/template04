'use client'
import React, { useState } from 'react'
const Clock = () => {

    const [hours, setHours] = useState<String>("")
    const [minutes, setMinutes] = useState<String>("")
    const [seconds, setSeconds] = useState<String>("")

    function updateClock() {
        const now = new Date();
        setHours(now.getHours().toString().padStart(2, "0"))
        setMinutes(now.getMinutes().toString().padStart(2, "0"))
        setSeconds(now.getSeconds().toString().padStart(2, "0"))
    }

    setInterval(() => {
        updateClock()
    }, 1000)

    return (
        hours && minutes ?
            <div className='width-max-content display-flex' style={{ margin: "0 auto", fontSize: "10rem" }}>
                <div style={{ padding: "5px" }}>{hours}</div>
                <div className='height-100p'>
                    <div className='height-50p' style={{ padding: "5px", fontSize: "45%" }}>{minutes}</div>
                    <div style={{ borderBottom: "1px solid" }}></div>
                    <div className='height-50p display-flex flex-direction-column justify-content-center text-align-center' style={{ padding: "5px", fontSize: "25%" }}>{seconds}</div>
                </div>
            </div> :
            <div className='width-max-content display-flex' style={{ margin: "0 auto", fontSize: "5rem" }}>
                ...
            </div>
    )
}

export default Clock