import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import Card from '../asset/card'
const App = () => {
    const apps = [
        {
            icon: "/icon/favicon.ico",
            name: "X'sion",
            link: "https://xsion-service.com/astem"
        },
        {
            icon: "/icon/meet_icon.png",
            name: "Astem Meet",
            link: "https://meet.google.com/oci-hodz-tzr"
        },
        {
            icon: "/icon/gmail.ico",
            name: "Gmail",
            link: "https://mail.google.com/"
        },
        {
            icon: "/icon/book_icon.png",
            name: "book",
            link: "/home/book"
        },
        {
            icon: "/icon/watch_icon.png",
            name: "watch",
            link: "/home/watch"
        },
    ]
    const toPage = useRouter()
    return (
        <div className='apps grid_box'>
            {
                apps.map((item: any, index: number) =>
                    <div className={`app xs4 sm3 md2 `} key={index} onClick={() => toPage.push(item.link)}>
                        <Card img={item.icon} />
                    </div>
                )}
        </div>
    )
}

export default App