'user client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import store from '@/redux/store';
import Button from '../input/button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadButton from '../input/uploadButton';
import { UserAuthen } from '@/api/UserAuthen';
import CheckIcon from '@mui/icons-material/Check';
type Props = {
    open?: boolean,
    close?: () => void,
    select?: (e: any) => void,
    type?: string,
}

const PictureModal = ({ open, close, select, type }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })


    const [refresh, setRefresh] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [copy, setCopy] = useState<boolean>(false)
    const [i, setI] = useState<number>(-1)

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            // create && create(reader.result, file)
            setLoading(true)
            const result = currentUser?.position && await UserAuthen.uploadFile(currentUser.position, file, "pic")
            console.log(result)
            if (result) {
                setLoading(false)
                setRefresh(n => n + 1)
            }
        }
    }

    const [data, setData] = useState<any>([])

    const getPhoto = async (p: string, archive: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, "", skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser?.position && getPhoto(currentUser.position, "pic", 0, 0)
    }, [refresh, currentUser.position])

    const modalStyle: React.CSSProperties = {
        display: "block",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backdropFilter: "brightness(0.1) blur(5px)",
        padding: "5px",
        overflow: "auto",
        zIndex: 4
    }
    const pageStyle: React.CSSProperties = {
        display: "block",
        width: "100%",
        height: "calc(100vh - 60px)",
        padding: "5px",
    }

    return (
        <div style={type === "page" ? pageStyle : open ? modalStyle : { display: "none" }}>
            {type === "page" ? null : <CloseIcon onClick={() => close && close()} style={{ position: "absolute", right: "5px", top: "5px", zIndex: 2, color: "white" }} />}
            <div className="grid_box">
                <div className='grid_child xs12'>
                    <UploadButton icon={loading ? "..." : "add Image"} func={(e) => getFile(e)} />
                </div>
                {
                    data?.map((item: any, index: any) =>
                        <div
                            className={`${currentTheme ? "light1" : "dark1"} ` + "grid_child xs4 sm4 md3 lg2 box-shadow-0"}
                            key={index}
                            style={{ height: "max-content", borderRadius: "5px", cursor: "pointer", margin: "10px", padding: "5px" }}
                            onClick={() => select && select(item)}>
                            <div style={{ aspectRatio: 1, position: "relative", overflow: "hidden", textAlign: "center" }}>
                                <Image src={process.env.ftp_url + item.name} width={500} height={500} alt='pic' style={{ width: "auto", height: "100%", borderRadius: "5px" }} priority={true} unoptimized />
                            </div>
                            <div style={{ display: "flex", fontSize: "0.8rem" }}>
                                {copy && i === index ? <CheckIcon /> :
                                    <ContentCopyIcon onClick={() => { setCopy(true), setI(index), navigator.clipboard.writeText(process.env.ftp_url + item.name) }} />}
                                <p style={{ textOverflow: "ellipsis", overflow: 'hidden', lineHeight: "24px" }}>{process.env.ftp_url + item.name}</p>
                            </div>
                        </div>
                    )

                }
            </div>
        </div>
    )
}

export default PictureModal