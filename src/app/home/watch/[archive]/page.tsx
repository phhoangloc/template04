'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import NotFound from '@/app/not-found'
type Props = {
    params: { archive: string }
}

const Sign = ({ params }: Props) => {

    const [watchs, setWatch] = useState<any>()

    const getWatch = async (genre: string, brand: string) => {
        const result = await NoUserAuthen.getItem(genre, brand.toLocaleUpperCase(), "")
        if (result.success) {
            setWatch(result.data)
        } else {
            setWatch(undefined)
        }
    }

    useEffect(() => {
        getWatch("watch", params.archive === "brand" ? "" : params.archive)
    }, [])

    const toPage = useRouter()

    if (watchs && watchs.length) {
        return (
            <div className='watch_body'>
                <div className="watch_home_items">
                    <h2>Đồng Hồ Nam</h2>
                    <p className='slogan'>Thời gian không bao giờ trôi qua mà không để lại dấu vết. <br></br>
                        Khám phá và tạo dấu ấn cho cuộc sống của bạn cùng chúng tôi!</p>
                    <div className="items grid_box">
                        {watchs.map((watch: any, index: number) =>
                            <div className={` item xs6 sm4 md3 lg2 `} key={index} onClick={() => toPage.push("/home/watch/" + watch.brand + "/" + watch.slug)}>
                                <div className="pic">
                                    <Image src={process.env.google_url + watch?.img?.[watch.img?.length - 1]?.name} fill sizes='100' alt='item' />
                                </div>
                                <div className="title">
                                    <p className='price'>{Number(watch.price).toLocaleString('en-US')} VND</p>
                                    <p className='name'>{watch.name}</p>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        )

    }

    return <NotFound />
}

export default Sign