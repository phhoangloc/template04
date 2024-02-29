'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Input from '@/component/asset/input'
import TextArea from '@/component/asset/textarea'
import Button from '@/component/asset/button'
import { useRouter } from 'next/navigation'
import UploadButton from '@/component/asset/uploadButton'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SyncIcon from '@mui/icons-material/Sync';
import Image from 'next/image'
import store from '@/redux/store'
import Icon from '@/component/asset/icon'
import { AdminAuthen } from '@/action/AdminAuthen'
type Props = {
    archive: string,
    id: string
}

const SingleWatch = ({ archive, id }: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const [currentslug, setCurrentSlug] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [brand, setBrand] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [detailIn, setDetailIn] = useState<string>("")


    const [imgPres, setImgPres] = useState<any>([])
    const [imgFiles, setImgFiles] = useState<File[]>([])
    const [imgNames, setImgNames] = useState<string[] | undefined>()
    const [viewImg, setViewImg] = useState<React.ReactNode>()
    const [loading, setLoading] = useState<boolean>(false)
    const toPage = useRouter()

    const uploadCover = async (file: File) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)
        const fileUpload = await axios.post(process.env.server_url + "admin/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        })
        fileUpload.data && setLoading(false)
        return fileUpload.data

    }
    const uploadImage = (files: File[]) => {
        setImgNames(imgNames)
        files.map(async (file: File) => {
            const img = await uploadCover(file)
            setImgNames(pre => pre ? [...pre, img] : [img])
        })
    }


    const save = async (data: any, id: string, imgNames: any) => {

        const body = {
            slug: data.slug,
            img: imgNames,
            name: data.name,
            brand: data.brand,
            price: data.price,
            detail: data.detail,
        }

        if (id !== "new_") {

            const result = await axios.put(process.env.server_url + `admin/${archive}?id=${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })
            if (result.data.success) {
                toPage.push("/admin/watch/")
            }
        } else {
            const result = await axios.post(process.env.server_url + `admin/${archive}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage && localStorage.token
                },
            })
            if (result.data.success) {
                toPage.push("/admin/watch/")
            }
        }

    }


    const getItem = async (a: string, s: string) => {
        if (id !== "new_") {
            const result = await AdminAuthen.getItemDetail(a, s)

            if (result.success) {
                setCurrentSlug(result.data[0].slug)
                setName(result.data[0].name)
                setBrand(result.data[0].brand)
                setPrice(result.data[0].price)
                setDetail(result.data[0].detail)
                setImgPres(result.data[0].img)
                setImgNames(result.data[0].img)
            }
        }
    }

    useEffect(() => {
        getItem(archive, id)
    }, [id])

    const getFile = async (e: any) => {
        var files = e.target.files;
        const arrFiles: File[] = Object.values(files)
        arrFiles.map((file: File, index: number) => {
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setImgPres((prev: any) => [...prev, reader.result])
                setImgFiles((prev: File[]) => [...prev, file])
            }
        })
    }

    const getIndexImg = (i: number) => {
        setImgPres(imgPres.filter((item: any, index: number) => index !== i))
        setImgFiles(imgFiles.filter((item: any, index: number) => index !== i))
        setImgNames(imgNames && imgNames.filter((item: any, index: number) => index !== i))
    }

    const preImg = (imgs: any) => {
        setViewImg(
            imgs.length ?
                imgs.reverse().map((img: any, index: number) =>
                    <div className="imgItem" key={index}>
                        {img instanceof Object !== true && img.indexOf("data:image/jpeg") !== -1 ?
                            <Image key={index} src={img} width={500} height={500} alt='fromgg' priority={true} /> :
                            <Image key={index} src={process.env.google_url + img.name} width={500} height={500} alt='fromgg' priority={true} />}
                        <CloseIcon onClick={() => getIndexImg(index)} />
                    </div>) :
                []
        )
    }

    useEffect(() => {
        preImg(imgPres)
    }, [imgPres])


    return (
        <div className={`main ${currentMenu ? "main_while_menu_open" : ""}`}>
            <div className={`property ${currentTheme ? "background_light" : "background_dark"}`}>
                <Input name="slug" value={currentslug} onChange={v => setCurrentSlug(v)} />
                <Input name="name" value={name} onChange={v => setName(v)} />
                <Input name="brand" value={brand} onChange={v => setBrand(v)} />
                <Input name="price" value={price} onChange={v => setPrice(v)} />
            </div>
            <div className={`property ${currentTheme ? "background_light" : "background_dark"}`}>
                <div className="title">
                    <p>picture</p>
                    <UploadButton icon={<UploadFileIcon />} func={v => getFile(v)} size={30} />
                    {loading ?
                        <Icon icon={<SyncIcon />} size={30} /> :
                        <Icon icon={<CheckIcon onClick={() => uploadImage(imgFiles)} />} size={30} />}
                </div>
                <div className="viewImg">{viewImg}</div>
            </div>
            <div className={`property ${currentTheme ? "background_light" : "background_dark"}`}>
                <TextArea name="detail" value={detail} onChange={v => setDetail(v)} />
            </div>

            <Button name={id === "new_" ? "create" : "save"} onClick={() => save({ slug: currentslug, name, brand, price, detail: detail || detailIn }, id, imgNames)} />

        </div>
    )
}

export default SingleWatch

//

