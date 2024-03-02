'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import NotFound from '@/app/not-found'
import Card from '@/component/asset/card'
import store from '@/redux/store'
type Props = {
    params: { archive: string }
}

const Sign = ({ params }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()


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
                <div className={`watch_home_items ${currentTheme ? "background_light" : "background_dark"}`}>
                    <h2>Đồng Hồ Nam</h2>
                    <p className='slogan'>Thời gian không bao giờ trôi qua mà không để lại dấu vết. <br></br>
                        Khám phá và tạo dấu ấn cho cuộc sống của bạn cùng chúng tôi!</p>
                    <div className="items grid_box">
                        {watchs.map((watch: any, index: number) =>
                            <div className={` item xs12 sm6 md4 lg3 `} key={index} onClick={() => toPage.push("/home/watch/" + watch.brand + "/" + watch.slug)}>
                                <Card type='column'
                                    img={process.env.google_url + watch?.img?.[watch?.img?.length - 1].name}
                                    title={watch?.name}
                                    sub={Number(watch.price).toLocaleString('en-US') + "VND"} />
                            </div>)}
                    </div>
                </div>
            </div>
        )

    }

    return <NotFound />
}

export default Sign