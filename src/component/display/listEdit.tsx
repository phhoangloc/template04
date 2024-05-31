'use client'
import React, { useState, useEffect } from 'react'
import Button from '@/component/input/button'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useRouter } from 'next/navigation';
import { UserAuthen } from '@/api/UserAuthen';
import store from '@/redux/store';

type Props = {
    archive: string
}
const ListEdit = ({ archive }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    }, [])

    const toPage = useRouter()

    const [selectId, setSelectId] = useState<string[]>([])

    const [data, setData] = useState<any[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(0)
    const [end, setEnd] = useState<boolean>(false)

    const getItem = async (p: string, archive: string, search: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, search, skip, limit)
        if (result?.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }
    const getItemV2 = async (p: string, archive: string, search: string, skip: number, limit: number) => {
        const result = await UserAuthen.getItem(p, archive, search, skip, limit)
        if (result?.success) {
            if (result?.data?.length) { setEnd(false) } else { setEnd(true) }
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser.position && archive && getItem(currentUser.position, archive, search, page * limit, limit)
        currentUser.position && archive && getItemV2(currentUser.position, archive, search, page + 1 * limit, limit)
    }, [currentUser.position, archive, search, page])

    const deleteAllPost = (ids: string[]) => {
        console.log(ids)
    }
    const deletePost = (id: string) => {
        console.log(id)
    }
    return (
        <div style={{ height: "100vh", width: "100%", padding: "0 10px" }}>
            <div style={{ width: "max-content", margin: "0" }}>
                <Button name={'new ' + archive} onClick={() => toPage.push(archive + "/new")} />
            </div>
            <div className='display-flex' style={{ height: "40px" }}>
                <div style={{ width: "40px", height: "100%" }}>
                    {selectId.length ?
                        <DeleteIcon style={{ width: "100%", height: "100%", boxSizing: "border-box", padding: "5px" }} onClick={() => deleteAllPost(selectId)} />
                        : null}
                </div>
                <div style={{ width: "calc(100% - 80px)", height: "100%", lineHeight: "50px", fontWeight: "bold", margin: "" }}>{archive}s</div>
                <div style={{ width: "40px" }}></div>
            </div>


            {data.length ? data.map((item, index) =>
                <div key={index} className='display-flex hover-background-color-128-15p hover-boder-radius-5px hover-opacity-1'
                    style={{ cursor: "pointer", height: "40px", opacity: 0.85 }}>
                    <div style={{ width: "40px" }}>
                        {selectId.includes(item._id) ?
                            <CheckBoxOutlinedIcon style={{ width: "100%", height: "100%", boxSizing: "border-box", padding: "5px" }}
                                onClick={() => setSelectId(p => p.filter(i => i != item._id))} /> :
                            <CheckBoxOutlineBlankIcon style={{ width: "100%", height: "100%", boxSizing: "border-box", padding: "5px" }}
                                onClick={() => setSelectId(p => [...p, item._id])} />}
                    </div>
                    <div style={{ width: "calc(100% - 80px)", height: "100%", lineHeight: "40px" }}>
                        <p onClick={() => archive === "user" ? toPage.push(archive + "/" + item._id) : toPage.push(archive + "/" + item.slug)}>
                            {item.name || item.username}
                            <span style={{ fontSize: "0.75rem", opacity: 0.5, margin: "0 5px" }}>{item.position}</span>
                        </p>
                    </div>
                    <div style={{ width: "40px" }}><DeleteIcon style={{ width: "100%", height: "100%", boxSizing: "border-box", padding: "5px" }}
                        onClick={() => deletePost(item._id)} /></div>
                </div>) :
                <div className='flexbox'>
                    <div style={{ width: "50px" }}></div>
                    <div style={{ width: "100%", textAlign: "center" }}>{loading ? <p>wait a minute</p> : <p>there is no {archive}</p>}</div>
                    <div style={{ width: "50px" }}></div>
                </div>
            }

            {/* {data.length ? <Pagination page={page} end={end} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} /> : null} */}
        </div >
    )
}

export default ListEdit