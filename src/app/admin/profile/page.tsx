'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import store from '@/redux/store'
import UploadPicturePreview from '@/component/input/uploadPicturePreview'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Input from '@/component/input/input'
import PictureModal from '@/component/modal/pictureModal'
import { NoUserAuthen } from '@/api/NoUserAuthen'
import Button from '@/component/input/button'
import { UserAuthen } from '@/api/UserAuthen'
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

    const [pictureModal, setPictureModal] = useState<boolean>(false)
    const [saving, setSaving] = useState<boolean>(false)

    const [imgIndex, setImgIndex] = useState<number>(0)
    const [cover, setCover] = useState<string>("")
    const [avata, setAvata] = useState<string>("")
    const [coverPreview, setCoverPreview] = useState<string>("")
    const [avataPreview, setAvataPreview] = useState<string>("")

    const [firstname, setFirstname] = useState<string>(currentUser?.firstname)
    const [lastname, setLastname] = useState<string>(currentUser?.lastname)
    const [username, setUsername] = useState<string>(currentUser?.username)
    const [email, setEmail] = useState<string>(currentUser?.email)
    const [newdetail, setNewDetail] = useState<string>("")

    const body = {
        firstname,
        lastname,
        username,
        cover,
        avata: avata || currentUser.avata?._id,
        detail: newdetail || currentUser?.detail,
    }

    const getCoverName = async (genre: string, id: string) => {
        const result = await NoUserAuthen.getOneItemById(genre, id)
        if (result.success) {
            setCoverPreview(result.data[0].name)
        } else {
            setCoverPreview("")
        }
    }
    const getAvatarName = async (genre: string, id: string) => {
        const result = await NoUserAuthen.getOneItemById(genre, id)
        if (result.success) {
            setAvataPreview(result.data[0].name)
        } else {
            setAvataPreview("")
        }
    }
    useEffect(() => {
        cover && getCoverName("pic", cover)
        avata && getAvatarName("pic", avata)
    }, [cover, avata])

    const updateUser = async (body: any) => {
        setSaving(true)
        const result = await UserAuthen.updateItem(currentUser.position, "user", currentUser._id, body)
        if (result.success) {
            setTimeout(() => {
                setSaving(false)
            }, 2000)
        }
    }

    return (
        <div className={`grid_box`}>
            <div className={`${currentTheme ? "light1" : "dark1"} box-shadow-0 grid_child xs12`}
                style={{ height: "425px", margin: "10px", position: "relative", padding: "10px", borderRadius: "5px" }}>
                <div style={{ width: "100%", height: "300px", borderRadius: "5px", textAlign: "center", overflow: "hidden", position: "relative" }}>
                    <UploadPicturePreview
                        icon={<AddPhotoAlternateIcon />}
                        src={coverPreview ? process.env.ftp_url + coverPreview : currentUser?.cover?.name ? process.env.ftp_url + currentUser.cover.name : "/img/defaultImg.jpg"}
                        imgstyle={{ position: "absolute", objectFit: "cover", top: 0, left: 0, width: "100%" }}
                        func={() => { setPictureModal(true), setImgIndex(1) }}
                    />

                </div>
                <div style={{ position: "absolute", top: "200px", left: "25px", minWidth: "100px", width: "100%", maxWidth: "200px", aspectRatio: 1, borderRadius: "50%", textAlign: "center", overflow: "hidden" }}>
                    <UploadPicturePreview
                        icon={<AddPhotoAlternateIcon />}
                        iconStyle={{ position: "absolute", bottom: "12.5%", right: "12.5%", zIndex: 1, color: "grey", background: "whitesmoke", borderRadius: "5px" }}
                        src={avataPreview ? process.env.ftp_url + avataPreview : currentUser?.avata?.name ? process.env.ftp_url + currentUser.avata.name : "/img/avata.jpg"}

                        func={() => { setPictureModal(true), setImgIndex(2) }}
                    />
                </div>
            </div>
            <div className={`${currentTheme ? "light1" : "dark1"} box-shadow-0 grid_child xs12 md6`} style={{ padding: "1%" }}>
                <h2>information</h2>
                <Input name="firstname" value={firstname} onChange={(v) => setFirstname(v)} />
                <Input name="lastname" value={lastname} onChange={(v) => setLastname(v)} />
                <Input name="username" value={username} onChange={(v) => setUsername(v)} />
                <Input name="email" value={email} onChange={(v) => setEmail(v)} />
            </div>
            <div className={`${currentTheme ? "light1" : "dark1"} box-shadow-0 grid_child xs12 md6`} >
                <TextAreaTool onChange={(v) => setNewDetail(v)} value={`${currentUser?.detail || "write something about you"}`} name='' />
            </div>
            <div style={{ width: "max-content", margin: "auto" }}>
                {saving ? <Button name="loading..." onClick={() => { }} /> : <Button name='save' onClick={() => updateUser(body)}></Button>}
            </div>
            <PictureModal open={pictureModal} close={() => setPictureModal(false)} select={(pic) => { imgIndex === 1 && setCover(pic._id), imgIndex === 2 && setAvata(pic._id), setPictureModal(false) }} />
        </div>
    )
}

export default Page