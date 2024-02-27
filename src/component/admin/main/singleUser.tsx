'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import store from '@/redux/store'
import { setNotice } from '@/redux/reducer/noticeReducer'
import Input from '@/component/asset/input'
import TextArea from '@/component/asset/textarea'
import Button from '@/component/asset/button'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import UploadPicture from '@/component/asset/uploadPicture'
import { UserAuthen } from '@/action/UserAuthen'
import { AdminAuthen } from '@/action/AdminAuthen'
import { setAlert } from '@/redux/reducer/alertReducer'
import { AlertType } from '@/redux/reducer/alertReducer'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import BurstModeOutlinedIcon from '@mui/icons-material/BurstModeOutlined';
import Image from 'next/image'
import Icon from '@/component/asset/icon'
type Props = {
    archive: string,
    id: string
}

const SingleUser = ({ archive, id }: Props) => {

    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    update()

    const [i, setI] = useState<number>(0)

    const refresh = () => {
        setI(prev => prev + 1)
    }

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [fullname, setFullname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)
    const [intro, setIntro] = useState<string>("")
    const [background, setBackground] = useState<any>()
    const [backgroundPre, setBackgroundPre] = useState<string>()
    const [avata, setAvata] = useState<any>()
    const [avataPre, setAvataPre] = useState<string>()
    const [imgFile, setImgFile] = useState<File>()
    const [pic, setPic] = useState<any[]>([])

    const [saveBackground, setSaveBackground] = useState<boolean>(false)
    const [saveAvata, setSaveAvata] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [pictureModalOpen, setPictureModalOpen] = useState<boolean>(false)

    const getItem = async (a: string, id: string) => {
        if (id !== "new_") {
            const result = await AdminAuthen.getItemDetail(a, id)
            if (result.success) {
                setUsername(result.data[0].username)
                setPosition(result.data[0].position)
                setEmail(result.data[0].email)
                setBackground(result.data[0].background)
                setAvata(result.data[0].avata)
                setPic(result.data[0].pic)
                setFullname(result.data[0].infor.fullname)
                setPhone(result.data[0].infor.phone)
                setAddress(result.data[0].infor.address)
                setActive(result.data[0].active)
                setIntro(result.data[0].intro)
            }
        }
    }

    useEffect(() => {
        getItem(archive, id)
    }, [id])

    const uploadImgB = async (a: boolean, b: boolean, f: File | undefined) => {
        if (a && b && f) {
            setLoading(true)
            const result = await AdminAuthen.uploadFile(f)
            setBackground(result)
            setPic((prev) => [...prev, result])
            setLoading(false)
            setSaveBackground(false)
            store.dispatch(setAlert({ value: false, open: false, msg: "" }))
        }
    }
    const uploadImgA = async (a: boolean, b: boolean, f: File | undefined) => {
        if (a && b && f) {
            setLoading(true)
            const result = await AdminAuthen.uploadFile(f)
            setAvata(result)
            setPic((prev) => [...prev, result])
            setLoading(false)
            setSaveBackground(false)
            store.dispatch(setAlert({ value: false, open: false, msg: "" }))
        }
    }
    useEffect(() => {
        saveBackground && uploadImgB(store.getState().alert.value, saveBackground, imgFile)
    }, [store.getState().alert.value])

    useEffect(() => {
        saveAvata && uploadImgA(store.getState().alert.value, saveAvata, imgFile)
    }, [store.getState().alert.value])

    const save = async () => {

        const body = {
            username,
            position,
            email,
            active,
            intro,
            background,
            avata,
            pic,
            infor: {
                fullname,
                address,
                phone
            }
        }

        // console.log(body)
        const result = await AdminAuthen.editItem(archive, id, body)

        store.dispatch(setNotice({ success: result.success, open: true, msg: result.msg }))
        setTimeout(() => {
            store.dispatch(setNotice({ success: result.success, open: false, msg: "" }))
        }, 3000)

        refresh()
    }

    const [currentPic, setCurrenPic] = useState<any[]>([])
    const [modalBackground, setModalBackground] = useState<boolean>(false)
    const getCurrentPic = async (u: string) => {
        const result = await AdminAuthen.getPic(u)
        setCurrenPic(result.data)
    }

    useEffect(() => {
        getCurrentPic(currentUser?.username)
    }, [i])
    return (
        <div className={`main ${currentMenu ? "main_while_menu_open" : ""}`}>
            <div className={`property ${currentTheme ? "background_light" : "background_dark"}`}>
                <UploadPicture
                    loading={loading}
                    src={backgroundPre ? backgroundPre : background && process.env.google_url + background.name}
                    setPrePicture={(p) => setBackgroundPre(p)}
                    setPreFile={(f) => {
                        setPictureModalOpen(true)
                        setImgFile(f);
                        store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn thay đổi hình nền này không?" }));
                        setSaveBackground(true)
                    }}
                />
                <Icon icon={<BurstModeOutlinedIcon />} onClick={() => setModalBackground(!modalBackground)} />
                <div className={`pictureModal  ${pictureModalOpen ? "pictureModal_0pen" : ""} ${modalBackground ? "pictureModal_open" : ""}`}>
                    <div className="pictureModalTool">
                        <p>{currentUser.username}</p>
                    </div>
                    <div className={`grid_box pictureBox `}>
                        {currentPic.map((item: any, index: any) =>
                            <div key={index} className={`pic xs6 sm4 md3 ${item?._id === background?._id || item?._id === background ? "select" : ""}`} onClick={() => { setBackgroundPre(process.env.google_url + item.name), setBackground(item._id) }}>
                                <Image src={process.env.google_url + item.name} width={100} height={100} alt="item" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`property ${currentTheme ? "background_light" : "background_dark"}`}>
                <div className="xs12 avata">
                    <div className="avata_img">
                        <UploadPicture
                            loading={loading}
                            src={avataPre ? avataPre : avata && process.env.google_url + avata.name}
                            setPrePicture={(p) => setAvataPre(p)}
                            setPreFile={(f) => {
                                setImgFile(f);
                                store.dispatch(setAlert({ value: false, open: true, msg: "bạn có muốn thay đổi hình đại diện này không?" }));
                                setSaveAvata(true)
                            }} />
                    </div>
                    <div className="avata_title">{username}<br></br><span>{position}</span></div>
                </div>
                <div className="xs12 ">
                    <Input name="username" value={username} onChange={(e) => setUsername(e)} />
                </div>
                <div className="xs12 ">
                    {/* <Select name="position" options={["user", "admin"]} onChange={(e) => setPosition(e)} /> */}
                </div>
                <div className="xs12 ">
                    <Input name="email" value={email} onChange={(e) => setEmail(e)} />
                </div>
                <div className="xs12 ">
                    <Input name="fullname" value={fullname} onChange={(e) => setFullname(e)} />
                </div>
                <div className="xs12 ">
                    <Input name="address" value={address} onChange={(e) => setAddress(e)} />
                </div>
                <div className="xs12 ">
                    <Input name="phone" value={phone} onChange={(e) => setPhone(e)} />
                </div>
                <div className="xs12">
                    <p className='active'>active: {active ? <CheckBoxIcon onClick={() => setActive(!active)} /> : <CheckBoxOutlineBlankIcon onClick={() => setActive(!active)} />}</p>
                </div>
            </div>
            <div className={`property ${currentTheme ? "background_light" : "background_dark"}`}>
                <TextArea name="intro" value={intro} onChange={(e) => setIntro(e)} />
            </div>
            <Button name='save' onClick={() => save()} />
        </div>
    )
}

export default SingleUser