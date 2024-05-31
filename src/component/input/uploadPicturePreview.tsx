'use client'

import Image from 'next/image';
import LoopIcon from '@mui/icons-material/Loop';

type Props = {
    icon: React.ReactNode | string;
    src: any,
    size?: number,
    func?: () => void,
    loading?: boolean,
    imgstyle?: React.CSSProperties
    iconStyle?: React.CSSProperties
}

const UploadPicturePreview = ({ size, src, icon, func, loading, imgstyle, iconStyle }: Props) => {

    return (
        <div style={{ height: "100%", position: "relative" }}>
            <div style={{ height: "100%", position: "relative" }}>
                <Image src={src} alt='pic' unoptimized fill style={imgstyle || { objectFit: "cover", opacity: "1" }} priority={true} />
            </div>
            <div onClick={() => func && func()}
                style={iconStyle || { width: size + "px", height: size + "px", zIndex: 1, color: "grey", background: "whitesmoke", position: "absolute", bottom: "5px", right: "5px", borderRadius: "5px" }}>
                {loading ? <LoopIcon /> : icon}
            </div>
        </div>
    )
}

export default UploadPicturePreview