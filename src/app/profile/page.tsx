'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import store from '@/redux/store'
import UploadPicturePreview from '@/component/input/uploadPicturePreview'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Input from '@/component/input/input'
import TextAreaTool from '@/component/input/textareaTool'
type Props = {}

const Page = (props: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    return (
        <div className={`grid_box`} style={{ maxWidth: "1200px", margin: "auto" }}>
            <div className={`${currentTheme ? "light1" : "dark1"} box-shadow-0 grid_child xs12`}
                style={{ height: "425px", margin: "10px", position: "relative", padding: "10px", borderRadius: "5px" }}>
                <div style={{ width: "100%", height: "300px", borderRadius: "5px", textAlign: "center", overflow: "hidden", position: "relative" }}>
                    <UploadPicturePreview
                        icon={<></>}
                        src={currentUser?.cover?.name ? process.env.ftp_url + currentUser.cover.name : "/img/defaultImg.jpg"}
                        imgstyle={{ position: "absolute", objectFit: "cover", top: 0, left: 0, width: "100%" }}
                    />

                </div>
                <div style={{ position: "absolute", top: "200px", left: "25px", minWidth: "100px", width: "100%", maxWidth: "200px", aspectRatio: 1, borderRadius: "50%", textAlign: "center", overflow: "hidden" }}>
                    <UploadPicturePreview
                        icon={<AddPhotoAlternateIcon />}
                        iconStyle={{ position: "absolute", bottom: "12.5%", right: "12.5%", zIndex: 1, color: "grey", background: "whitesmoke", borderRadius: "5px" }}
                        src={currentUser?.avata?.name ? process.env.ftp_url + currentUser.avata.name : "/img/avata.jpg"}
                    />
                </div>
            </div>
            <div className={`${currentTheme ? "light1" : "dark1"} box-shadow-0 grid_child xs12 md6`} style={{ padding: "1%" }}>
                <h2>information</h2>
                <Input name="firstname" value={currentUser.firstname} onChange={() => { }} disabled={true} />
                <Input name="lastname" value={currentUser.lastname} onChange={() => { }} disabled={true} />
                <Input name="username" value={currentUser.username} onChange={() => { }} disabled={true} />
                <Input name="email" value={currentUser.username} onChange={() => { }} disabled={true} />
            </div>
            <div className={`${currentTheme ? "light1" : "dark1"} box-shadow-0 grid_child xs12 md6`} style={{ padding: "1%" }}>
                <h2>about me</h2>
                <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: currentUser?.detail }} />
            </div>
        </div>
    )
}

export default Page