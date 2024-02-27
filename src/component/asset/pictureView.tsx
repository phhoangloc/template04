import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import Image from 'next/image'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import Icon from './icon';
type Props = {
    data: any
    select?: (arr: string[]) => void
    selectOne?: (id: string) => void
    loading?: boolean
}

const PictureView = ({ data, select, selectOne, loading }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()
    const [checkArray, setCheckArray] = useState<any[]>([])
    useEffect(() => {
        select && select(checkArray)
    }, [checkArray])

    return (
        <div className="grid_box">
            {loading ?
                <div className={`pic center xs6 sm4 md3 lg2 ${currentTheme ? "background_light" : "background_dark"}`}>
                    <Icon icon={<LoopIcon />} size={50} />
                </div> :
                null}
            {data.length ?
                data.map((item: any, index: number) =>
                    <div className={`pic xs6 sm4 md3 lg2 ${currentTheme ? "background_light" : "background_dark"}`} key={index}>
                        <div className="picbox ">
                            <Image src={process.env.google_url + item.name} alt="" width={500} height={500} />
                            {checkArray.includes(item) ?
                                <CheckBoxIcon onClick={() => setCheckArray(prev => prev.filter(itm => itm !== item))} /> :
                                <CheckBoxOutlineBlankIcon onClick={() => setCheckArray(prev => [...prev, item])} />}
                        </div>
                        <p>{item.host.username}<DeleteIcon onClick={() => selectOne && selectOne(item)} /></p>
                    </div>
                ) : null
            }
        </div>
    )
}

export default PictureView