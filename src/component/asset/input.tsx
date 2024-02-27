import React, { useRef, useState } from 'react'
import "../style/style.css"
type Props = {
    onChange: (e: string) => void,
    name: React.ReactNode,
    value: string,
    type?: string
}

const Input = ({ onChange, name, value, type }: Props) => {
    const [focus, setFocus] = useState<boolean>(false)
    return (
        <div className={`input ${focus || value ? "input_focus" : ""}`}>
            <p className={`name ${focus || value ? "name_focus" : ""}`} >{name}</p>
            <input className="input_box"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                type={type}
            ></input>
        </div >
    )
}

export default Input