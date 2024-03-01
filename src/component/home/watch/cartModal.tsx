'use client'
import React, { useState } from 'react'
import store from '@/redux/store'
import { UserLoginType } from '@/redux/reducer/UserReduce'
import Button from '@/component/asset/button'
import { useRouter } from 'next/navigation'
import Icon from '@/component/asset/icon'
import { setMenu } from '@/redux/reducer/MenuReduce'
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const CartModal = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    update()

    const toPage = useRouter()

    const carts = currentUser?.carts

    return (
        <div className={`cart_modal ${currentMenu ? "cart_open" : ""} ${currentTheme ? "background_light" : "background_dark"}`}>
            <Icon icon={<CloseIcon />} onClick={() => store.dispatch(setMenu(false))} />
            {
                currentUser?.username ?
                    <div className='username'>
                        <p onClick={() => toPage.push("/home/profile")}>{currentUser?.username}</p>
                        <p className='logout'>log out</p>
                    </div> :
                    <Button name='login' onClick={() => toPage.push("/login")} />
            }

            {
                carts?.length && carts?.map((c: any, index: number) =>
                    <div className="card cart" key={index}>
                        <h4>{c.watch.name}</h4>
                        <p>{Number(c.watch.price).toLocaleString('en-US')} VND</p>
                        <DeleteOutlineOutlinedIcon />
                    </div>
                )
            }
        </div>
    )
}

export default CartModal