import React from 'react'
import store from '@/redux/store'
import { useState } from 'react'
import { NoticeType } from "../redux/reducer/noticeReducer"
const NoticeModal = () => {

    const [notice, setCurrentNotice] = useState<NoticeType>(store.getState().notice)

    const update = () => {
        store.subscribe(() => setCurrentNotice(store.getState().notice))
    }

    update()

    return (
        <div className={` ${notice.success ? "notice_success_true" : "notice_success_fail"} notice ${notice.open ? "notice_open" : ""}`}>{notice.msg}</div>
    )
}

export default NoticeModal