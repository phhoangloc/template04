import React from 'react'
type Props = {
    params: { archive: string }
}

const Sign = ({ params }: Props) => {

    return (
        <div className='watch_body'>{params.archive}</div>
    )
}

export default Sign