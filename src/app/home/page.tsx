'use client'
import Header from '@/component/admin/header'
import Clock from '@/component/home/clock'
import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UploadButton from '@/component/asset/uploadButton';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { UserLoginType } from '@/redux/reducer/UserReduce';
import store from '@/redux/store';
import Image from 'next/image';
import { AlertType, setAlert } from '@/redux/reducer/alertReducer';
import { UserAuthen } from '@/action/UserAuthen';
import { setNotice } from '@/redux/reducer/noticeReducer';
import App from '@/component/home/app';

setAlert
const Home = () => {

    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const [alert, setCurrentAlert] = useState<AlertType>()

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }

    update()

    const [prePicture, setPrePicture] = useState<any>()
    const [FilePicture, setFilePicture] = useState<File>()

    const [saveBackground, setSaveBackground] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setSaveBackground(true)
            setPrePicture(reader.result)
            currentUser._id && setFilePicture(file)
            currentUser._id && store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn update background này không" }))

        }
    }

    const uploadImgB = async (a: boolean, b: boolean, f: File | undefined) => {

        if (a && b && f) {
            setLoading(true)
            const imgId = await UserAuthen.uploadFile(f)
            console.log(imgId)
            const result = await UserAuthen.update({ id: currentUser._id, background: imgId, pic: [...currentUser.pic, imgId] })
            setLoading(false)
            setSaveBackground(false)
            store.dispatch(setAlert({ value: false, open: false, msg: "" }))
            if (result.success) {
                store.dispatch(setNotice({ success: result.success, open: true, msg: "upload background success!" }))
                setTimeout(() => {
                    store.dispatch(setNotice({ success: true, open: false, msg: "" }))
                }, 3000)
            }
        }
    }

    useEffect(() => {
        saveBackground && uploadImgB(store.getState().alert.value, saveBackground, FilePicture)
    }, [store.getState().alert.value])


    return (
        <div className={' home center '}>
            {prePicture ? <Image alt="bg" src={prePicture} quality={100} fill style={{ objectFit: 'cover', zIndex: 0, opacity: 0.25 }} /> :
                currentUser?.background?.name ? <Image alt="bg" src={process.env.google_url + currentUser?.background?.name} quality={100} fill style={{ objectFit: 'cover', zIndex: 0, opacity: 0.25 }} /> :
                    null}
            <Clock />
            <App />
            <UploadButton icon={<InsertPhotoOutlinedIcon />} func={(e) => getFile(e)} />

        </div>
    )
}

export default Home