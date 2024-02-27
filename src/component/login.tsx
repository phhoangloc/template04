'use client'
import React, { useState } from 'react'
import Input from './asset/input'
import store from '@/redux/store'
import Button from './asset/button'
import { NoUserAuthen } from '@/action/NoUserAuthen'
import { useRouter } from 'next/navigation'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import Link from 'next/link'
import { setNotice } from '@/redux/reducer/noticeReducer'
type Props = {}

const Login = (props: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)


    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const toPage = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (data: { username: string, password: string }) => {
        const result = await NoUserAuthen.login(data)
        if (result.success) {
            localStorage.token = "bearer " + result.data.token
            window.location.reload()
        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)
        }
    }
    return (
        <div className={`login ${currentTheme ? "background_light" : "background_dark"}`}>
            <h2>Log In</h2>
            <Input name="username" value={username} onChange={(e => setUsername(e))} />
            <Input name="password" type='password' value={password} onChange={(e => setPassword(e))} />
            <Button name="Log In" onClick={() => login({ username, password })} />
            <Link href={"signup"}>sign up</Link>
        </div>
    )
}

export default Login