import React from 'react'
type Props = {
    onClick: () => void,
    name: string,
    disable?: boolean
}

const Button = ({ onClick, name, disable }: Props) => {
    return (
        <div style={{ width: "100px", height: "40px", margin: "5px", background: "#0073e6" }}>
            <button style={{ border: "none", width: "100%", height: "100%", cursor: "pointer", background: "none", color: "white", fontWeight: "bold" }}
                disabled={disable ? disable : false} onClick={() => onClick()}>
                {name}
            </button>
        </div>
    )
}

export default Button