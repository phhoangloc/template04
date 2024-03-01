import React from 'react'
import Image from 'next/image'
import '../../component/style/style.css'
type Props = {
    type?: string,
    img: string,
    title?: string,
    sub?: string
}

const Card = ({ type, img, title, sub }: Props) => {
    switch (type) {
        case "column":
            return (
                <div className='card grid_column'>
                    <div className="image">
                        <Image src={img} width={500} height={500} alt="icon" />
                    </div>
                    <div className="info center">
                        <p className='title'>{title}</p>
                        {sub ? <p className='sub'>{sub}</p> : null}
                    </div>
                </div>
            )
        case "row":
            return (
                <div className='card grid_row'>
                    <Image src={img} width={500} height={500} alt="icon" />
                    <div className="info center">
                        <p className='title'>{title}</p>
                        {sub ? <p className='sub'>{sub}</p> : null}
                    </div>
                </div>
            )
    }
    return (
        <div className='card' >
            <Image src={img} width={500} height={500} alt="icon" />
            <div className="info center">
                <p className='title'>{title}</p>
                {sub ? <p className='sub'>{sub}</p> : null}
            </div>
        </div>
    )
}

export default Card