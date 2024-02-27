import React, { useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import Image from 'next/image';
import UploadButton from './uploadButton';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import store from '@/redux/store';
import { AlertType } from '@/redux/reducer/alertReducer';
UploadButton
type Props = {
    src?: string,
    setPrePicture?: (e: any) => void
    setPreFile?: (f: File) => void,
    loading?: boolean
}

const UploadPicture = ({ src, setPrePicture, setPreFile, loading }: Props) => {

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setPrePicture && setPrePicture(reader.result)
            setPreFile && setPreFile(file)
        }
    }

    return (
        <div className='UploadPicture'>
            {src ? <Image src={src} alt='pic' priority={true} fill sizes="100" /> : null}
            <div className="tool">
                {loading ? <RefreshIcon /> : <UploadButton icon={<AddPhotoAlternateOutlinedIcon />} func={(e) => getFile(e)} />}
            </div>
        </div>
    )
}

export default UploadPicture