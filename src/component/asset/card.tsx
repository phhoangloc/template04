import React from 'react'
import Image from 'next/image'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import '../../component/style/style.css'
import { AddCard } from '@mui/icons-material';
type Props = {
    img: string,
    title?: string,
    sub?: string,
    specifications?: any[],
    addcart?: boolean,
    addfavour?: boolean
}

const Card = ({ img, title, sub, specifications, addcart }: Props) => {
    return (
        <div className='card grid_box' >
            <div className='image xs12'>
                <Image src={img} width={500} height={500} alt="icon" />
            </div>
            <div className="info xs12">
                <div className="text">
                    {title ? <p className='title'>{title}</p> : null}
                    {sub ? <p className='sub'>{sub}</p> : null}
                    {specifications ?
                        <ul>
                            <li>aaaa</li>
                            <li>aaaa</li>
                            <li>aaaa</li>
                            <li>aaaa</li>
                        </ul> :
                        null}
                </div>
                <div className="button">
                    {addcart ?
                        <div className="addcartButton center">
                            <AddShoppingCartIcon />
                            <p>Add Cart</p>
                        </div> :
                        null}
                </div>
            </div>
        </div>
    )
}

export default Card