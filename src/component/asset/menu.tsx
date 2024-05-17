import React, { useState } from 'react'
import Accordion from '../tool/accordion';
type Props = {
    data: any[],
    width: string
}

const Menu = ({ data, width }: Props) => {

    return (
        <div>
            {
                data.map((item, index) =>
                    <Accordion key={index} title={item.name} data={item.child} width={width} />
                )
            }
        </div>
    )
}

export default Menu