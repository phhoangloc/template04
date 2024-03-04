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

const CardRow = ({ img, title, sub, specifications, addcart }: Props) => {
    return (
        <div className='card grid_box' >
            <div className='image xs12 sm5 md3 '>
                <Image src={img} width={500} height={500} alt="icon" />
            </div>
            <div className="info grid_box xs12 sm7 md9">
                <div className="text xs12 md10">
                    {title ? <p className='title'>{title}</p> : null}
                    {sub ? <p className='sub'>{sub}</p> : null}
                    {specifications ?
                        <ul className='specifications'>
                            <li>aaaa</li>
                            <li>aaaa</li>
                            <li>aaaa</li>
                            <li>aaaa</li>
                        </ul> :
                        null}
                </div>
                <div className="button xs12 md2">
                    {addcart ?
                        <div className="addcartButton center">
                            <AddShoppingCartIcon />
                        </div> :
                        null}
                </div>
            </div>
        </div>
    )
}

export default CardRow