'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import NotFound from '@/app/not-found'
import Card from '@/component/asset/card'
import store from '@/redux/store'
import Loading from '@/app/loading'
import Input from '@/component/asset/input'
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardRow from '@/component/asset/cardRow'
type Props = {
    params: { archive: string }
}

const Sign = ({ params }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [loading, setLoading] = useState<boolean>(true)
    const [watchs, setWatch] = useState<any>()

    const getWatch = async (genre: string, brand: string) => {
        const result = await NoUserAuthen.getItem(genre, brand.toLocaleUpperCase(), "")
        if (result.success) {
            setWatch(result.data)
            setLoading(false)
        } else {
            setWatch(undefined)
            setLoading(false)
        }
    }

    useEffect(() => {
        getWatch("watch", params.archive === "brand" ? "" : params.archive)
    }, [])

    const toPage = useRouter()

    const [search, setSearch] = useState<string>("")
    if (watchs && watchs.length) {
        return (
            <div className='watch_body'>
                <div className={`watch_home_items ${currentTheme ? "background_light" : "background_dark"}`}>
                    <div className={`tool_archive ${currentTheme ? "background_light" : "background_dark"}`}>
                        <Input name={<SearchIcon />} value={search} onChange={(e) => setSearch(e)} />
                    </div>
                    {watchs.map((watch: any, index: number) =>
                        <div className="item" key={index} onClick={() => toPage.push("/home/watch/" + watch.brand + "/" + watch.slug)}>
                            <CardRow addcart={true}
                                specifications={["aaa"]}
                                img={process.env.google_url + watch?.img?.[watch?.img?.length - 1].name}
                                title={watch?.name}
                                sub={Number(watch.price).toLocaleString('en-US') + "VND"} />
                        </div>
                    )}
                </div>
            </div>

        )

    }

    return loading ? <Loading /> : <NotFound />
}

export default Sign