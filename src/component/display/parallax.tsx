'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
type Props = {
    data?: any[]
}

const Parallax = ({ data }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })


    const parallax: any = useRef()

    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)

    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
        parallax.current.scrollTop = scrollTop - ((e.pageY - startY))
    }

    useEffect(() => {
        parallax.current.scrollLeft = `${(3000 - window.innerWidth) / 2}`
        parallax.current.scrollTop = `${(1500 - window.innerHeight) / 2}`
    }, [])

    const toPage = useRouter()
    return (
        <div ref={parallax} className='width-100p overflow-auto scrollbar-none'
            onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setStartY(e.pageY), setScrollTop(e.currentTarget.scrollTop), setScrollLeft(e.currentTarget.scrollLeft) }}
            onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
            onMouseUp={() => { setMountDown(false) }}
            onMouseLeave={() => setMountDown(false)}
            style={{
                height: "calc(100vh - 50px)"
            }}>
            <div className={`display-flex`}
                style={{
                    width: "3000px",
                    height: "1500px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    cursor: mouseDown ? 'grabbing' : 'grab',
                }}
            >
                {
                    data ? data.map((item: any, index: number) =>
                        <div className={`box-shadow-0 hover-item  ${currentTheme ? "light1" : "dark1"}`}
                            key={index}
                            onDoubleClick={() => toPage.push(`/home/${item.genre}/${item.slug}`)}
                            style={{
                                width: "200px",
                                aspectRatio: 1,
                                margin: "auto 10px",
                                borderRadius: "5px",
                                padding: "5px",
                                cursor: "pointer",
                                transition: "all 0.25s"
                            }}>
                            <div style={{ width: "100%", height: "80%", position: "relative", zIndex: 0, }}>
                                {item.cover?.name ?
                                    <Image src={process.env.ftp_url + item.cover?.name}
                                        fill alt='cover' draggable="false"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                        }}
                                        sizes="100"
                                        priority={false} /> :
                                    <Image src={"/img/defaultImg.png"}
                                        fill alt='cover' draggable="false"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                        }}
                                        sizes="100"
                                        priority={false} />}
                            </div>
                            <p
                                title={item.name}
                                style={{
                                    width: "100%",
                                    lineHeight: "250%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    // textWrap: "nowrap",
                                    userSelect: 'none',
                                    fontSize: "0.8rem"
                                }}
                            >{item.name}</p>
                        </div>) : "no data"
                }
            </div>
        </div>
    )

}

export default Parallax