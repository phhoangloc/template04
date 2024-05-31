'use client'
import React, { useState, useEffect } from 'react'
import UploadPicturePreview from '../input/uploadPicturePreview'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Input from '../input/input';
import TextAreaTool from '../input/textareaTool';
import PictureModal from '../modal/pictureModal';
import { UserAuthen } from '@/api/UserAuthen';
import { NoUserAuthen } from '@/api/NoUserAuthen';
import Button from '../input/button';
import store from '@/redux/store';
import { useRouter } from 'next/navigation';
type Props = {
    archive: string,
    slug: string
}

const ItemEdit = ({ archive, slug }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    }, [])

    const toPage = useRouter()

    const [pictureModal, setPictureModal] = useState<boolean>(false)
    const [saving, setSaving] = useState<boolean>(false)
    const [cover, setCover] = useState<string>("")
    const [coverPreview, setCoverPreview] = useState<string>("")

    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [newSlug, setNewSlug] = useState<string>("")
    const [detail, setDetail] = useState<string>("")
    const [newdetail, setNewDetail] = useState<string>("")

    const body = {
        name,
        slug: newSlug || "slug0_",
        cover,
        detail: newdetail || detail
    }

    const getOneUser = async (p: string, a: string, slug: string) => {
        const result = await UserAuthen.getOneItembySlug(p, a, slug)
        if (result.success) {
            setId(result.data[0]._id)
            setName(result.data[0].name)
            setNewSlug(result.data[0].slug)
            setCover(result.data[0].cover?._id)
            setDetail(result.data[0].detail)
        }
    }

    useEffect(() => {
        currentUser.position && slug !== "new" && getOneUser(currentUser.position, archive, slug)
    }, [currentUser.position, slug])

    const getCoverName = async (genre: string, id: string) => {
        const result = await NoUserAuthen.getOneItemById(genre, id)
        if (result.success) {
            setCoverPreview(result.data[0].name)
        } else {
            setCoverPreview("")
        }
    }

    useEffect(() => {
        cover && getCoverName("pic", cover)
    }, [cover])

    const createItem = async (body: any) => {
        setSaving(true)
        const result = await UserAuthen.createItem(currentUser.position, archive, body)

        if (result.success) {
            toPage.push(newSlug)
            setSaving(false)
        }
    }
    const updateItem = async (body: any) => {
        const result = await UserAuthen.updateItem(currentUser.position, archive, id, body)
        if (result.success) {
            toPage.push(newSlug)
            setSaving(false)
        }
    }

    return (
        <div className='grid_box'>
            <div className={`center xs12 md6 lg4`} style={{ height: "50vh", borderRadius: "5px", textAlign: "center", overflow: "hidden", margin: "10px" }}>
                <UploadPicturePreview
                    icon={<AddPhotoAlternateIcon />}
                    src={coverPreview ? process.env.ftp_url + coverPreview : "/img/defaultImg.jpg"}
                    func={() => setPictureModal(true)} />

            </div>
            <div className={`${currentTheme ? "light1" : "dark1"} xs12 md6 lg8 `} style={{ overflowX: "hidden", margin: "0 10px 10px", padding: "10px", borderRadius: "5px" }}>
                <Input name="name" onChange={(e) => setName(e)} value={name} />
                <Input name="slug" onChange={(e) => setNewSlug(e)} value={newSlug} />
                <TextAreaTool name='' onChange={(e) => setNewDetail(e)} value={detail || "write something about your blog"} />
                {saving ? <Button name="loading..." onClick={() => { }} /> : slug !== "new" ? <Button name='save' onClick={() => updateItem(body)}></Button> : <Button name='create' onClick={() => createItem(body)}></Button>}

            </div>
            <PictureModal open={pictureModal} close={() => setPictureModal(false)} select={(e) => { setCover(e._id), setPictureModal(false) }} />
        </div>
    )
}

export default ItemEdit