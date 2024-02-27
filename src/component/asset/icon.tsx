import React from 'react'
import '../style/style.css'
export type IconType = {
    icon: React.ReactNode,
    onClick?: () => void,
    size?: number,
}

const Icon = (props: IconType) => {
    return (
        <div className='icon' onClick={() => props.onClick && props.onClick()} style={{ width: props.size + "px", height: props.size + "px" }}>{props.icon}</div>
    )
}

export default Icon