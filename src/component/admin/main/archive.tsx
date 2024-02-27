'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { useRouter } from 'next/navigation';
import { AdminAuthen } from '@/action/AdminAuthen';
import { setNotice } from '@/redux/reducer/noticeReducer';
import Icon from '@/component/asset/icon';
import AddIcon from '@mui/icons-material/Add';
type Props = {
    archive: string
}
const ItemAchive = ({ archive }: Props) => {
    const toPage = useRouter()

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const [items, setItems] = useState<any>()

    const getItem = async (a: string) => {
        const result = await AdminAuthen.getItem(a)
        if (result.success) {
            setItems(result.data)
        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)
        }
    }

    useEffect(() => {
        getItem(archive)
    }, [])

    const deleteItem = (id: string) => {
        console.log(id)
    }


    return (
        <div className={`main ${currentMenu ? "main_while_menu_open" : ""}`}>
            <div className={`item ${currentTheme ? "background_light" : "background_dark"}`} onClick={() => toPage.push("/admin/" + archive + "/new_")}>
                <div className="icons" >
                    <Icon icon={<AddIcon />} size={30} /> new {archive}
                </div>
            </div>
            {
                items && items.length ?
                    items.map((item: any, index: string) =>
                        <div className={`item ${currentTheme ? "background_light" : "background_dark"}`} key={index}
                            onClick={() => toPage.push("/admin/" + archive + "/" + item._id)}>
                            <p>{item.username || item.name}</p>
                            <div className="icons" >
                                <Icon icon={<DeleteIcon onClick={() => deleteItem(item._id)} />} size={30} />
                            </div>
                        </div>)
                    : null
            }
        </div>
    )
}

export default ItemAchive