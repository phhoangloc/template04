'use client'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
type Props = {
    params: { slug: string }
}

const Sign = ({ params }: Props) => {

    const [watch, setWatch] = useState<any>()

    const getWatch = async (genre: string, slug: string) => {
        const result = await NoUserAuthen.getItem(genre, slug)

        if (result.success) {
            setWatch(result.data[0])
        } else {
            setWatch(undefined)
        }
    }

    useEffect(() => {
        getWatch("watch", params.slug)
    }, [])

    return (
        <div className='watch_body home_item'>
            <div className="home_item_main grid_box">
                <div className="home_item_main_left xs12 md6">
                    <div className="show">
                        {watch?.img?.[0]?.name ? <Image src={process.env.google_url + watch?.img?.[watch?.img?.length - 1]?.name} width={200} height={200} alt='itemimage' /> : null}
                    </div>
                    <div className="images">
                        {watch?.img && watch?.img?.map((image: any, index: number) =>
                            <div className={`circle `} key={index} >
                                <Image src={process.env.google_url + image?.name} width={50} height={50} alt='itemimage' />
                            </div>
                        )}
                    </div>
                </div>
                <div className="home_item_main_right xs12 md6" id="detail">
                    <h3>{watch?.name}</h3>
                    <table className='table'>
                        <tbody>
                            <tr><td>name</td><td>{watch?.name}</td></tr>
                            <tr><td>brand</td><td>{watch?.brand}</td></tr>
                            <tr><td>price</td><td>{Number(watch?.price).toLocaleString('en-US')} VND</td></tr>
                        </tbody>
                    </table>
                    <p>----------</p>
                    <div className="detail" dangerouslySetInnerHTML={{ __html: watch?.detail }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sign