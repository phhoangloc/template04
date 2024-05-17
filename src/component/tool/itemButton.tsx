import React from 'react'

type Props = {
    title: string,
    width?: string,

}

const ItemButton = ({ title, width }: Props) => {
    return (
        <div className='grid_box' style={{ height: "40px", lineHeight: "40px", cursor: "pointer" }}>
            <p style={{ width: width ? `calc(${width} - 40px)` : "100%" }}>{title}</p>
        </div>
    )
}

export default ItemButton