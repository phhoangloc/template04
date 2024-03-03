'use client'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import store from '@/redux/store'
import Button from '@/component/asset/button'
import { UserAuthen } from '@/action/UserAuthen'
import { NoticeType, setNotice } from '@/redux/reducer/noticeReducer'

type Props = {
    params: { slug: string }
}

const Sign = ({ params }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentNotice, setCurrentNotice] = useState<NoticeType>(store.getState().notice)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentNotice(store.getState().notice))
    }

    update()


    const [watch, setWatch] = useState<any>()

    const getWatch = async (genre: string, slug: string) => {
        const result = await NoUserAuthen.getItem(genre, "", slug)
        if (result.success) {
            setWatch(result.data[0])
        } else {
            setWatch(undefined)
        }
    }

    useEffect(() => {
        getWatch("watch", params.slug)
    }, [])

    const [i, setI] = useState<number>(-1)

    const createCart = async (id: string) => {
        const body = { watch: id }
        const result = await UserAuthen.createCart(body)
        console.log(result)

        store.dispatch(setNotice({ success: result.success, open: true, msg: result.msg }))
        setTimeout(() => {
            store.dispatch(setNotice({ success: result.success, open: false, msg: "" }))
        }, 3000)

    }
    return (
        <div className='watch_body home_item'>
            <div className="home_item_main grid_box">
                <div className={`home_item_main_left center xs12 md6 ${currentTheme ? "background_light" : "background_dark"}`}>
                    <div className="show center">
                        {watch?.img?.length ?
                            i !== -1 ?
                                <Image src={process.env.google_url + watch?.img?.[i]?.name} width={200} height={200} alt='itemimage' /> :
                                <Image src={process.env.google_url + watch?.img?.[watch?.img?.length - 1]?.name} width={200} height={200} alt='itemimage' /> :
                            null}
                    </div>
                    <div className="images">
                        {watch?.img && watch?.img?.map((image: any, index: number) =>
                            <div className={`circle `} key={index} onClick={() => setI(index)} >
                                <Image src={process.env.google_url + image?.name} width={50} height={50} alt='itemimage' />
                            </div>
                        )}
                    </div>
                </div>
                <div className={`home_item_main_right xs12 md6 `} id="detail">
                    <h3>{watch?.name}</h3>
                    <table className='table'>
                        <tbody>
                            <tr><td>name</td><td>{watch?.name}</td></tr>
                            <tr><td>brand</td><td>{watch?.brand}</td></tr>
                            <tr><td>price</td><td>{Number(watch?.price).toLocaleString('en-US')} VND</td></tr>
                        </tbody>
                    </table>
                    <Button name='thêm vào giỏ hàng' onClick={() => createCart(watch?._id)} />
                    <p className='line'>----------</p>
                    <div className="detail" dangerouslySetInnerHTML={{ __html: watch?.detail }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sign