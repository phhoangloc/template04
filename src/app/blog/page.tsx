import React from 'react'

type Props = {}

const page = (props: Props) => {

    const style: React.CSSProperties = {
        width: "calc((100% - 30px)/4 - 30px)",
        aspectRatio: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        border: "1px solid",
        borderRadius: "5px",
        margin: "30px 0 0px 30px"
    }

    return (
        <div className='min-height-100vh'>
        </div>
    )
}

export default page