'use client'
import React, { useState } from 'react'
import Accordion from '../tool/accordion';
import ItemButton from '../tool/itemButton';
type Props = {
    data: any[],
    width: string
}

const Menu = ({ data, width }: Props) => {

    return (
        <div>
            {
                data.map((item, index) =>
                    item.child ?
                        <Accordion key={index} title={item.name} data={item.child} width={width} /> :
                        <ItemButton key={index} title={item.name} />
                )
            }
        </div>
    )
}

export default Menu