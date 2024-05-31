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
import UserEdit from '@/component/display/userEdit'
type Props = {}


const Page = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    return <UserEdit id={currentUser._id} />
}

export default Page