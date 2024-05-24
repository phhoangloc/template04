'use client'
import React, { useRef } from 'react'
type Props = {
    icon: React.ReactNode | string;
    size?: number
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ icon, size, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div style={{ width: "max-content", height: "max-content", background: "#0073e6", cursor: "pointer", borderRadius: "5px", padding: "5px 10px" }}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()} style={{ padding: "5px", width: size + "px", height: size + "px", color: "white" }}>{icon}</div>
        </div>
    )
}

export default UploadButton