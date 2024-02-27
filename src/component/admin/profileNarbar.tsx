import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import { setAlert } from '@/redux/reducer/alertReducer'
import { AlertType } from '@/redux/reducer/alertReducer'
import { UserLoginType } from '@/redux/reducer/UserReduce'
type Props = {
    open: boolean,
    close: (e: boolean) => void
}

const ProfileNarbar = ({ open, close }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentUser, setCurrentUser] = useState<UserLoginType>(store.getState().user)


    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }

    update()

    const toPage = useRouter()

    const [wantLogOut, setWantLogOut] = useState<boolean>(false)

    const logout = (a: boolean, b: boolean) => {
        if (a && b) {
            localStorage.clear()
            setWantLogOut(false)
            window.location.reload()
        }
    }
    useEffect(() => {
        logout(store.getState().alert.value, wantLogOut)
    }, [store.getState().alert.value])


    return (
        <div className={`profile_narbar ${currentTheme ? "background_light" : "background_dark"} ${open ? "profile_narbar_open" : ""} ${currentTheme ? "background_light" : "background_dark"}`}>
            <p onClick={() => { toPage.push("/admin/user/" + currentUser._id), close(false) }}>PROFILE</p>
            <p onClick={() => { store.dispatch(setAlert({ value: false, open: true, msg: "do you want to log out" })), setWantLogOut(true), close(false) }}>LOG OUT</p>
        </div>
    )
}

export default ProfileNarbar