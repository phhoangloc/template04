import React from 'react'
import store from '@/redux/store'
import { useState } from 'react'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
import Button from './asset/button'

const AlertModal = () => {

    const [alert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)


    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    return (
        <div className={` alert ${currentTheme ? "background_light" : "background_dark"} ${alert.open ? "alert_open" : ""}`}>
            <p>{alert.msg}</p>
            <div className="box">
                <Button name='yes' onClick={() => store.dispatch(setAlert({ value: true, open: false, msg: "" }))} />
                <Button name='no' onClick={() => store.dispatch(setAlert({ value: false, open: false, msg: "" }))} />
            </div>
        </div>
    )
}

export default AlertModal